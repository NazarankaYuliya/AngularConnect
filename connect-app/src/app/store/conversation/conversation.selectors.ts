import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  conversationAdapter,
  ConversationState,
} from 'src/app/store/conversation/conversation.state';

export const selectConversationState =
  createFeatureSelector<ConversationState>('conversations');

export const { selectAll: selectAllConversations } =
  conversationAdapter.getSelectors(selectConversationState);

export const selectConversations = createSelector(
  selectConversationState,
  selectAllConversations
);
