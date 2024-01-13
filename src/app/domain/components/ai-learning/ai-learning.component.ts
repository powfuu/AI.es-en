import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { arrowForward, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  IonSearchbar,
  IonContent,
  IonHeader,
  IonIcon,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { OpenAiService } from 'src/core/services/openai/openai.service';
import { Observable, finalize, map, merge, mergeMap, of, tap } from 'rxjs';
import { ToastService } from 'src/core/services/toast/toast.service';

@Component({
  selector: 'app-ai-learning',
  imports: [
    FormsModule,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonIcon,
    CommonModule,
    IonSkeletonText,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './ai-learning.component.html',
  styleUrls: ['./ai-learning.component.scss'],
})
export class AiLearningComponent implements OnInit {
  openAi = inject(OpenAiService);
  toast = inject(ToastService);
  isLoading: boolean = true;
  isLoadingLinguisticInsights: boolean = false;
  input!: string;
  suggestions$!: Observable<string[]>;
  result: Observable<any> | null = null;
  selectedData!: string;

  constructor() {}

  ngOnInit() {
    addIcons({ arrowForward, closeCircle });
    this.getSuggestions();
  }

  getInformationAbout(value: string) {
    this.isLoadingLinguisticInsights = true;
    this.selectedData = value;
    this.openAi
      .getApiResponse(value, 'linguisticInsights')
      .pipe(finalize(() => (this.isLoadingLinguisticInsights = false)))
      .subscribe({
        next: (data) => {
          const translationAndMeaning =
            data.choices[0].message.content.split('\n');
          const translation = translationAndMeaning[0].replace(
            'Translation: ',
            ''
          );
          const meaning = translationAndMeaning[1].replace('Meaning: ', '');
          const description = translationAndMeaning[2].trim();

          this.result = of({
            translation,
            meaning,
            description,
          });
        },
        error: () =>
          this.toast.error(
            'Process has failed, search input may be wrong or contains an incorrect prompt.'
          ),
      });
  }

  getSuggestions(): void {
    this.suggestions$ = this.openAi
      .getApiResponse('suggestions', 'suggestions')
      .pipe(
        map((response) => {
          const content = response.choices[0].message.content;
          const suggestionsArray = content.split('\n');
          const suggestionsWithoutNumbers = suggestionsArray.map(
            (item: string) => item.replace(/^\d+\.\s/, '')
          );
          return suggestionsWithoutNumbers;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      );
  }
}
