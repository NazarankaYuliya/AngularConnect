import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesState } from 'src/app/store/groupMessages/messages.state';

import * as UserSelectors from '../people/people.selectors';

export const selectMessagesState = createFeatureSelector<MessagesState>('messages');

export const selectMessagesByGroupId = (groupID: string) =>
  createSelector(
    selectMessagesState,
    UserSelectors.selectAllUsers,
    (messageState: MessagesState, users) => {
      const messages = messageState.messages[groupID] || [];

      return messages.map((message) => {
        const user = users.find((u) => u.uid === message.authorID);
        const authorName = user ? user.name : 'Unknown User';
        return { ...message, authorName };
      });
    }
  );

// (state: MessagesState) => state.messages[groupID] || []
