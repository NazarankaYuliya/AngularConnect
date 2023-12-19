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

export const addConversation = createAction(
  '[Conversation] Add Conversation',
  props<{ conversation: ConversationListItem }>()
);

export const removeConversation = createAction(
  '[Conversation] Remove Conversation',
  props<{ conversationId: string }>()
);

export const removeConversationSuccess = createAction(
  '[Conversation] Remove Conversation Success',
  props<{ conversationId: string }>()
);
