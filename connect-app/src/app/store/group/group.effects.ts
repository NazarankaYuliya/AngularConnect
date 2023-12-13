import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as GroupActions from './group.actions';

import { GroupListResponce } from 'src/app/modules/communication/models/group.models';
import { GroupService } from 'src/app/modules/communication/services/group.service';
import { Store, select } from '@ngrx/store';
import * as GroupSelectors from './group.selectors';

@Injectable()
export class GroupEffects {
  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.loadGroups),
      withLatestFrom(this.store.pipe(select(GroupSelectors.selectAllGroups))),
      mergeMap(([, groups]) => {
        if (groups.length === 0) {
          return this.groupService.getGroupList().pipe(
            map((response: GroupListResponce) => {
              const groups = response.Items.map((item) => ({
                id: item.id.S,
                name: item.name.S,
                createdAt: item.createdAt.S,
                createdBy: item.createdBy.S,
              }));

              return GroupActions.loadGroupsSuccess({ groups });
            }),
            catchError(() => of(GroupActions.loadGroupsFailure()))
          );
        } else {
          return of();
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private store: Store
  ) {}
}
