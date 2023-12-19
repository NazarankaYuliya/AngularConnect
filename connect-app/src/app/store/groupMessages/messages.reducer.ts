import { createReducer, on } from '@ngrx/store';

import * as MessagesActions from './messages.actions';
import { initialState } from './messages.state';

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.loadMessagesSuccess, (state, { messagesByGroupID }) => ({
    ...state,
    messages: {
      ...state.messages,
      ...messagesByGroupID,
    },
  })),
  on(MessagesActions.addGroupMessage, (state, { groupID, newMessage }) => {
    const updatedMessages = {
      ...state.messages,
      [groupID]: [...(state.messages[groupID] || []), newMessage],
    };

    return {
      ...state,
      messages: updatedMessages,
    };
  })
);
