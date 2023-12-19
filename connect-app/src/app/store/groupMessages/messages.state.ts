import { Message } from 'src/app/modules/communication/models/messages.models';

export interface MessagesState {
  messages: { [groupID: string]: Message[] };
}

export const initialState: MessagesState = {
  messages: {},
};
