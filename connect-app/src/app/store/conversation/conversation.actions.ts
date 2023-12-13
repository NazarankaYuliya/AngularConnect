import { createAction, props } from '@ngrx/store';
import { ConversationListItem } from 'src/app/modules/communication/models/people.models';

export const loadConversations = createAction(
  '[Conversation] Load Conversations'
);
export const loadConversationsSuccess = createAction(
  '[Conversation] Load Conversations Success',
  props<{ conversations: ConversationListItem[] }>()
);
export const loadConversationsFailure = createAction(
  '[Conversation] Load Conversations Failure'
);
