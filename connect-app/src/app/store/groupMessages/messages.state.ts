import { Message } from 'src/app/modules/communication/models/group.models';

export interface MessagesState {
  messages: { [groupID: string]: Message[] };
}

export const initialState: MessagesState = {
  messages: {},
};
