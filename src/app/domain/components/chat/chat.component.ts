import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  IonHeader,
  IonContent,
  ModalController,
  IonSearchbar,
  IonIcon,
  IonItem,
  IonMenu,
  IonList,
  IonToast,
  MenuController
} from '@ionic/angular/standalone';
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
  arrowDown,
  thunderstorm,
  menuOutline,
  send,
  trash,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Observable, finalize } from 'rxjs';
import { Conversation } from '../../models/conversations.model';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AssistantService } from 'src/core/services/assistant/assistant.service';
import { UtilService } from 'src/core/services/util/util.service';
import { ToastService } from 'src/core/services/toast/toast.service';
import { OpenAiService } from 'src/core/services/openai/openai.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    IonContent,
    IonSearchbar,
    CommonModule,
    IonIcon,
    IonList,
    IonItem,
    IonMenu,
    IonToast,
    IonHeader,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  modalController = inject(ModalController);
  openAi = inject(OpenAiService);
  menuCtrl = inject(MenuController);
  store = inject(Store);
  util = inject(UtilService);
  toast = inject(ToastService);
  @ViewChild('conversationsContainer', { static: false }) private conversationsContainerRef!: ElementRef;
  conversations$!: Observable<Conversation[]>;
  message: string = '';
  gptIsAnswering: boolean = false;

  constructor() {
    this.conversations$ = this.store.select(
      (assistantStore) => assistantStore.conversationsStore
    );
  }

  ngOnInit() {
    addIcons({
      logoIonitron,
      chatbubbleEllipses,
      closeCircle,
      send,
      football,
      barbell,
      bug,
      arrowDown,
      carSport,
      menuOutline,
      trash,
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
    setTimeout(() => {
      this.scrollToBottom();
    }, 150);
  }

  getConversation(conversations: any) {
    return conversations.conversations.find((data: Conversation) => data.id === conversations.currentConversation);
  }

  sendMessage(conversation: Conversation) {
    if (this.message.trim().length > 1) {
      this.util.sendMessage(conversation.id, this.message, 'user');
      setTimeout(() => {
        this.scrollToBottom();
      }, 40);
      this.initSendedMessageProcess(conversation.id);
    } else {
      this.toast.error("Message should be a valid field.");
    }
  }

  initSendedMessageProcess(conversationId: number) {
    this.gptIsAnswering = true;
    this.openAi.getApiResponse(this.message, 'conversation').pipe(finalize(() => {
      this.gptIsAnswering = false;
      this.message = "";
      setTimeout(() => {
        this.scrollToBottom();
      }, 40);
    })).subscribe(response => this.util.sendMessage(conversationId, response.choices[0].message.content, 'system'))
  }

  back() {
    setTimeout(() => {
      this.modalController.dismiss();
    }, 150);
  }

  scrollToBottom() {
    const container = this.conversationsContainerRef.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  openMenuHeader() {
    this.menuCtrl.open('menu-header');
  }

  removeChat(idConversation: number) {
    this.util.removeConversation(idConversation).then(() => {
      this.back();
    });
  }
}
