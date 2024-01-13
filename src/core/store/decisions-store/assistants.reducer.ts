import { createReducer, on } from '@ngrx/store';
import { initialState } from './assistant.state';
import * as AssistantActions from './assistant.actions';
import { Conversation } from 'src/app/domain/models/conversations.model';

export const assistantReducers = createReducer(
  initialState,
  on(AssistantActions.setAllConversations, (state, { conversations }) => ({
    ...state,
    conversations: conversations,
  })),
  on(AssistantActions.addConversation, (state, { conversation }) => ({
    ...state,
    conversations: [conversation, ...state.conversations],
  })),
  on(AssistantActions.setCurrentConversation, (state, { id }) => ({
    ...state,
    currentConversation: id
  })),
  on(AssistantActions.removeConversation, (state, { id }) => ({
    ...state,
    conversations: state.conversations.filter(
      (conversation: Conversation) => conversation.id !== id
    ),
  })),
  on(AssistantActions.sendMessage, (state, { id, message, sender }) => {
    return {
      ...state,
      conversations: state.conversations.map(conversation => {
        if (conversation.id === id) {
          const updatedMessages = [...conversation.messages || [], { message, sender: sender }];
          return {
            ...conversation,
            messages: updatedMessages
          };
        } else {
          return conversation;
        }
      })
    };
  })
);
