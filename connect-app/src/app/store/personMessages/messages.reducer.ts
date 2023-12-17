import { createReducer, on } from '@ngrx/store';

import * as MessagesActions from './messages.actions';
import { initialConversationMessagesState } from './messages.state';

export const conversationMessagesReducer = createReducer(
  initialConversationMessagesState,
  on(
    MessagesActions.loadConversationMessagesSuccess,
    (state, { messagesByConversationID }) => ({
      ...state,
      messages: {
        ...state.messages,
        ...messagesByConversationID,
      },
    })
  ),
  on(
    MessagesActions.addConversationMessage,
    (state, { conversationID, newMessage }) => {
      const updatedMessages = {
        ...state.messages,
        [conversationID]: [
          ...(state.messages[conversationID] || []),
          newMessage,
        ],
      };

      return {
        ...state,
        messages: updatedMessages,
      };
    }
  )
);
