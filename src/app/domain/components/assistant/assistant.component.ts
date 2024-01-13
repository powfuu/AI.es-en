import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonItem, IonButton, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, logoIonitron } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { Conversation } from '../../models/conversations.model';
import { Store } from '@ngrx/store';
import { ConversationsComponent } from '../conversations/conversations.component';
import { UtilService } from 'src/core/services/util/util.service';
import { LocalStoreService } from 'src/core/services/localStore/local-store.service';
import { AssistantService } from 'src/core/services/assistant/assistant.service';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonItem,
    IonButton,
    IonToast,
    ConversationsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit {
  store = inject(Store);
  localStore = inject(LocalStoreService);
  utilService = inject(UtilService);
  assistantService = inject(AssistantService);
  conversations$!: Observable<Conversation[]>;

  constructor() {
    this.conversations$ = this.store.select(
      (assistantStore) => assistantStore.conversationsStore.conversations
    );
  }

  ngOnInit() {
    addIcons({ add, logoIonitron });
    this.updateWithLocalStore();
  }

  async updateWithLocalStore() {
    const data = await this.localStore.getFromLocalStore('conversations');
    if (data && typeof data.value === 'string') {
      const conversations = JSON.parse(data.value);
      this.assistantService.setAllConversations(conversations);
    }
  }

  async addConversation() {
    this.utilService.showAddConversationModal();
  }
}
