import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as ConversationActions from './conversation.actions';
import * as ConversationSelectors from 'src/app/store/conversation/conversation.selectors';
import { ConversationService } from 'src/app/modules/communication/services/conversation.service';
import { Store, select } from '@ngrx/store';

@Injectable()
export class ConversationEffects {
  loadConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.loadConversations),
      withLatestFrom(
        this.store.pipe(select(ConversationSelectors.selectAllConversations))
      ),
      mergeMap(([, conversations]) => {
        if (conversations.length === 0) {
          return this.conversationService.getConversationsList().pipe(
            map((response) => {
              const conversations = response.Items;
              return ConversationActions.loadConversationsSuccess({
                conversations,
              });
            }),
            catchError(() => EMPTY)
          );
        } else {
          return of();
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private store: Store
  ) {}
}
