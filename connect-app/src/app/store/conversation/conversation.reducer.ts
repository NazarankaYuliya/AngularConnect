import { createReducer, on } from '@ngrx/store';
import {
  conversationAdapter,
  initialConversationState,
} from 'src/app/store/conversation/conversation.state';

import * as ConversationActions from './conversation.actions';

export const conversationReducer = createReducer(
  initialConversationState,
  on(ConversationActions.loadConversationsSuccess, (state, { conversations }) =>
    conversationAdapter.setAll(conversations, state)
  ),
  on(ConversationActions.addConversation, (state, { conversation }) =>
    conversationAdapter.addOne(conversation, state)
  ),
  on(ConversationActions.removeConversation, (state, { conversationId }) =>
    conversationAdapter.removeOne(conversationId, state)
  )
);
