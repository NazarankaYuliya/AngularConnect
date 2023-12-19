import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ConversationListItem } from 'src/app/modules/communication/models/people.models';

function selectConversationId(conversation: ConversationListItem): string {
  return conversation.id.S;
}

export const conversationAdapter = createEntityAdapter<ConversationListItem>({
  selectId: selectConversationId,
});

export type ConversationState = EntityState<ConversationListItem>;

export const initialConversationState: ConversationState = conversationAdapter.getInitialState();
