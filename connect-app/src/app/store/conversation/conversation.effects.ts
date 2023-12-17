import { Injectable } from '@angular/core';
import {
  Actions, concatLatestFrom, createEffect, ofType
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ConversationService } from 'src/app/modules/communication/services/conversation.service';
import * as ConversationSelectors from 'src/app/store/conversation/conversation.selectors';

import * as ConversationActions from './conversation.actions';

@Injectable()
export class ConversationEffects {
  loadConversations$ = createEffect(() => { return this.actions$.pipe(
    ofType(ConversationActions.loadConversations),
    concatLatestFrom(() =>
      this.store.select(ConversationSelectors.selectAllConversations)
    ),
    mergeMap(([, loadedConversations]) => {
      if (loadedConversations.length === 0) {
        return this.conversationService.getConversationsList().pipe(
          map((response) => {
            const conversations = response.Items;
            return ConversationActions.loadConversationsSuccess({
              conversations,
            });
          }),
          catchError(() => EMPTY)
        );
      }
      return of();
    })
  ) }
  );

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private store: Store
  ) {}
}
