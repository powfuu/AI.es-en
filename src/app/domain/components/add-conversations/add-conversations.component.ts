import { HttpClient } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonButton,
  IonContent,
  ModalController,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  barbell,
  bug,
  carSport,
  card,
  chatbubbleEllipses,
  closeCircle,
  codeSlash,
  desktop,
  fastFood,
  football,
  gameController,
  logoElectron,
  logoIonitron,
  logoOctocat,
  logoReddit,
  logoSnapchat,
  logoTux,
  logoXbox,
  shirt,
  thunderstorm,
} from 'ionicons/icons';
import { ToastService } from 'src/core/services/toast/toast.service';
import { UtilService } from 'src/core/services/util/util.service';
import { ConversationIcons } from '../../models/conversations-icons.mode';

@Component({
  standalone: true,
  imports: [IonHeader, IonButton, IonContent, FormsModule, IonSearchbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-add-conversations',
  templateUrl: './add-conversations.component.html',
  styleUrls: ['./add-conversations.component.scss'],
})
export class AddConversationsComponent implements OnInit {
  http = inject(HttpClient);
  modalController = inject(ModalController);
  toast = inject(ToastService);
  utilService = inject(UtilService);
  conversationCategory: string = '';
  conversationIcons: string = 'football';
  icons!: any[];
  constructor() { }

  ngOnInit() {
    addIcons({
      logoIonitron,
      chatbubbleEllipses,
      closeCircle,
      football,
      barbell,
      bug,
      carSport,
      card,
      codeSlash,
      desktop,
      fastFood,
      gameController,
      shirt,
      thunderstorm,
      logoElectron,
      logoOctocat,
      logoReddit,
      logoTux,
      logoSnapchat,
      logoXbox,
    });
    this.onLoadConversationIcons();
  }

  onLoadConversationIcons() {
    this.http
      .get<ConversationIcons[]>('assets/JSON/conversation-icons.json')
      .subscribe((data) => (this.icons = data));
  }

  confirm() {
    if (this.conversationCategory.length <= 2) {
      return this.toast.error('Category must be a valid field.');
    }
    this.utilService.addConversation(
      this.conversationCategory,
      this.conversationIcons
    );
    setTimeout(() => {
      this.modalController.dismiss();
    }, 300);
  }

  cancel() {
    this.modalController.dismiss();
  }

  selectIcon(icon: string) {
    this.conversationIcons = icon;
  }

  isSelected(icon: string): boolean {
    return this.conversationIcons === icon;
  }

  onSearchChange() {
    const inputValue = this.conversationCategory;
    const maxLength = 28;
    if (inputValue && inputValue.length > maxLength) {
      this.conversationCategory = inputValue.slice(0, maxLength);
    }
  }
}
