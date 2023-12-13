import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import * as UserActions from './people.actions';
import { PeopleService } from 'src/app/modules/communication/services/people.service';
import {
  PeopleListItem,
  PeopleListResponse,
} from 'src/app/modules/communication/models/people.models';
import * as UserSelectors from './people.selectors';
import { Store, select } from '@ngrx/store';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      withLatestFrom(this.store.pipe(select(UserSelectors.selectAllUsers))),
      mergeMap(([, groups]) => {
        if (groups.length === 0) {
          return this.peopleService.getPeopleList().pipe(
            map((response: PeopleListResponse) => {
              const users = response.Items.map((item: PeopleListItem) => {
                return {
                  uid: item.uid.S,
                  name: item.name.S,
                };
              });
              return UserActions.loadUsersSuccess({ users });
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
    private peopleService: PeopleService,
    private store: Store
  ) {}
}
