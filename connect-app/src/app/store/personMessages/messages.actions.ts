import { createAction, props } from '@ngrx/store';
import { Message } from 'src/app/modules/communication/models/messages.models';

export const loadConversationMessages = createAction(
  '[Person Messages] Load Person Messages',
  props<{ conversationID: string; since?: number }>()
);

export const loadConversationMessagesSuccess = createAction(
  '[Person Messages] Load Person Messages Success',
  props<{ messagesByConversationID: { [conversationID: string]: Message[] } }>()
);
export const loadConversationMessagesFailure = createAction(
  '[Person Messages] Load Person Messages Failure'
);

export const addConversationMessage = createAction(
  '[Person Messages] Add Person Messages Success',
  props<{ conversationID: string; newMessage: Message }>()
);
