import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationMessagesState } from './messages.state';

import * as UserSelectors from '../people/people.selectors';

export const selectConversationMessagesState =
  createFeatureSelector<ConversationMessagesState>('messages');

export const selectMessagesByConversationId = (conversationID: string) =>
  createSelector(
    selectConversationMessagesState,
    UserSelectors.selectAllUsers,
    (messageState: ConversationMessagesState, users) => {
      const messages = messageState.messages[conversationID] || [];

      return messages.map((message) => {
        const user = users.find((u) => u.uid === message.authorID);
        const authorName = user ? user.name : 'Unknown User';
        return { ...message, authorName };
      });
    }
  );
