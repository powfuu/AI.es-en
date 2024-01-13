import { Conversation } from 'src/app/domain/models/conversations.model';

export interface ConversationsState {
  conversations: Conversation[];
  currentConversation: number | null;
}

export interface ConversationsStore {
  conversationsStore: ConversationsState;
}

export const initialState: ConversationsState = {
  conversations: [],
  currentConversation: null
};
