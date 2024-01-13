import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  IonContent,
  IonSearchbar,
  IonIcon,
  IonItemSliding,
  IonItem,
  IonList,
  IonItemOption,
  IonItemOptions,
  IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircle,
  addCircleOutline,
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
import { Conversation } from '../../models/conversations.model';
import { UtilService } from 'src/core/services/util/util.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations',
  imports: [
    IonContent,
    IonSearchbar,
    IonIcon,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonToast,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
  utilService = inject(UtilService);
  router = inject(Router);
  @Input() conversations!: Conversation[];
  filteredConversations: Conversation[] = [];
  key: any = '';
  constructor() { }

  ngOnInit() {
    addIcons({
      addCircleOutline,
      addCircle,
      closeCircle,
      logoIonitron,
      chatbubbleEllipses,
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
  }

  generateNewConversation() {
    this.utilService.showAddConversationModal();
  }

  removeAIConversation(event: any, idConversation: number) {
    if (event.detail.ratio === 1) {
      this.utilService.removeConversation(idConversation);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversations'] && changes['conversations'].currentValue) {
      this.filterChats();
    }
  }

  filterChats() {
    if (this.key === '') {
      this.filteredConversations = [...this.conversations];
    } else {
      this.filteredConversations = this.conversations.filter(
        (cv) =>
          cv.category.toUpperCase().includes(this.key.toUpperCase()) ||
          cv.id.toString().includes(this.key) ||
          (cv.messages &&
            cv.messages.some((msg) =>
              msg.message.toUpperCase().includes(this.key.toUpperCase())
            ))
      );
    }
  }

  openChat(conversationId: number) {
    this.utilService.setCurrentConversation(conversationId);
    this.utilService.showChat();
  }

  getLastMessage(messages: any) {
    return messages[messages.length - 1]?.message
  }
}
