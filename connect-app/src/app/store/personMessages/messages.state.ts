import { Message } from 'src/app/modules/communication/models/messages.models';

export interface ConversationMessagesState {
  messages: { [conversationID: string]: Message[] };
}

export const initialConversationMessagesState: ConversationMessagesState = {
  messages: {},
};
