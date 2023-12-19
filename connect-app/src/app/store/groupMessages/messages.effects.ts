import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MessagesResponse } from 'src/app/modules/communication/models/messages.models';
import { GroupService } from 'src/app/modules/communication/services/group.service';
import * as MessagesActions from 'src/app/store/groupMessages/messages.actions';
import * as MessagesSelectors from 'src/app/store/groupMessages/messages.selectors';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private store: Store
  ) {}

  loadMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.loadMessages),
      concatLatestFrom(({ groupID }) =>
        this.store.select(MessagesSelectors.selectMessagesByGroupId(groupID))
      ),

      mergeMap(([action, messages]) => {
        const { groupID, since } = action;

        if (messages.length === 0) {
          return this.groupService.getGroupMessages(groupID, since).pipe(
            map((res: MessagesResponse) => {
              const messages = res.Items.map((item) => ({
                createdAt: item.createdAt.S,
                authorID: item.authorID.S,
                message: item.message.S,
              })).sort((a, b) => +a.createdAt - +b.createdAt);

              return MessagesActions.loadMessagesSuccess({
                messagesByGroupID: {
                  [groupID]: messages,
                },
              });
            }),
            catchError(() => of(MessagesActions.loadMessagesFailure()))
          );
        }

        const lastMessageDate = +messages[messages.length - 1].createdAt;

        return this.groupService
          .getGroupMessages(groupID, lastMessageDate)
          .pipe(
            map((res: MessagesResponse) => {
              const newMessages = res.Items.map((item) => ({
                createdAt: item.createdAt.S,
                authorID: item.authorID.S,
                message: item.message.S,
              })).sort((a, b) => +a.createdAt - +b.createdAt);

              return MessagesActions.loadMessagesSuccess({
                messagesByGroupID: {
                  [groupID]: [...messages, ...newMessages],
                },
              });
            }),
            catchError(() => of(MessagesActions.loadMessagesFailure()))
          );
      })
    );
  });
}
