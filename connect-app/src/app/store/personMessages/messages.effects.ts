import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MessagesResponse } from 'src/app/modules/communication/models/messages.models';

import * as MessagesActions from './messages.actions';
import * as MessagesSelectors from './messages.selectors';
import { ConversationService } from 'src/app/modules/communication/services/conversation.service';

@Injectable()
export class ConversationMessagesEffects {
  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private store: Store
  ) {}

  loadConversationMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.loadConversationMessages),
      concatLatestFrom(({ conversationID }) =>
        this.store.select(
          MessagesSelectors.selectMessagesByConversationId(conversationID)
        )
      ),

      mergeMap(([action, messages]) => {
        const { conversationID, since } = action;

        if (messages.length === 0) {
          return this.conversationService
            .getConversationMessages(conversationID, since)
            .pipe(
              map((res: MessagesResponse) => {
                const messages = res.Items.map((item) => ({
                  createdAt: item.createdAt.S,
                  authorID: item.authorID.S,
                  message: item.message.S,
                })).sort((a, b) => +a.createdAt - +b.createdAt);

                return MessagesActions.loadConversationMessagesSuccess({
                  messagesByConversationID: {
                    [conversationID]: messages,
                  },
                });
              }),
              catchError(() =>
                of(MessagesActions.loadConversationMessagesFailure())
              )
            );
        }

        const lastMessageDate = +messages[messages.length - 1].createdAt;

        return this.conversationService
          .getConversationMessages(conversationID, lastMessageDate)
          .pipe(
            map((res: MessagesResponse) => {
              const newMessages = res.Items.map((item) => ({
                createdAt: item.createdAt.S,
                authorID: item.authorID.S,
                message: item.message.S,
              })).sort((a, b) => +a.createdAt - +b.createdAt);

              return MessagesActions.loadConversationMessagesSuccess({
                messagesByConversationID: {
                  [conversationID]: [...messages, ...newMessages],
                },
              });
            }),
            catchError(() =>
              of(MessagesActions.loadConversationMessagesFailure())
            )
          );
      })
    );
  });
}
