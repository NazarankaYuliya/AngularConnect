import { Injectable } from '@angular/core';
import {
  Actions, concatLatestFrom, createEffect, ofType
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  catchError, map, mergeMap
} from 'rxjs/operators';
import {
  PeopleListItem,
  PeopleListResponse,
} from 'src/app/modules/communication/models/people.models';
import { PeopleService } from 'src/app/modules/communication/services/people.service';

import * as UserActions from './people.actions';
import * as UserSelectors from './people.selectors';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    concatLatestFrom(() => this.store.select((UserSelectors.selectAllUsers))),
    mergeMap(([, groups]) => {
      if (groups.length === 0) {
        return this.peopleService.getPeopleList().pipe(
          map((response: PeopleListResponse) => {
            const users = response.Items.map((item: PeopleListItem) => ({
                  uid: item.uid.S,
                  name: item.name.S,
                }));
            return UserActions.loadUsersSuccess({ users });
          }),
          catchError(() => EMPTY)
        );
      }
      return of();
      })
  )
  );

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private store: Store
  ) {}
}
