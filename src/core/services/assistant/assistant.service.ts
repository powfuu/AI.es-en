import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ConversationsActions from './../../store/decisions-store/assistant.actions';
import { Conversation } from 'src/app/domain/models/conversations.model';

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  constructor(private store: Store) { }

  setAllConversations(conversations: Conversation[]) {
    this.store.dispatch(
      ConversationsActions.setAllConversations({ conversations })
    );
  }

  setCurrentConversation(id: number) {
    this.store.dispatch(
      ConversationsActions.setCurrentConversation({ id })
    );
  }

  addConversation(conversation: Conversation) {
    this.store.dispatch(ConversationsActions.addConversation({ conversation }));
  }

  removeConversation(id: number) {
    this.store.dispatch(ConversationsActions.removeConversation({ id }));
  }

  sendMessage(id: number, message: string, sender: string) {
    this.store.dispatch(ConversationsActions.sendMessage({ id, message, sender }));
  }
}
