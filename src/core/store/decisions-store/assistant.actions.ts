import { createAction, props } from '@ngrx/store';
import { Conversation } from 'src/app/domain/models/conversations.model';

export const setAllConversations = createAction(
  '[STORE] Set all conversation',
  props<{ conversations: Conversation[] }>()
);

export const addConversation = createAction(
  '[STORE] Add Conversation',
  props<{ conversation: Conversation }>()
);

export const removeConversation = createAction(
  '[STORE] Remove Conversation',
  props<{ id: number }>()
);

export const setCurrentConversation = createAction(
  '[STORE] Set current conversation',
  props<{ id: number | null }>()
);

export const sendMessage = createAction(
  '[STORE] Send message',
  props<{ id: number, message: string, sender: string }>()
);
