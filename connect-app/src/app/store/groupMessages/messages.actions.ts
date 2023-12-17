import { createAction, props } from '@ngrx/store';
import { Message } from 'src/app/modules/communication/models/messages.models';

export const loadMessages = createAction(
  '[Messages] Load Messages',
  props<{ groupID: string; since?: number }>()
);

export const loadMessagesSuccess = createAction(
  '[Messages] Load Messages Success',
  props<{ messagesByGroupID: { [groupID: string]: Message[] } }>()
);
export const loadMessagesFailure = createAction(
  '[Messages] Load Messages Failure'
);

export const addGroupMessage = createAction(
  '[Messages] Add Messages Success',
  props<{ groupID: string; newMessage: Message }>()
);
