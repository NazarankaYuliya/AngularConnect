import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GroupListResponce } from 'src/app/modules/communication/models/group.models';
import { GroupService } from 'src/app/modules/communication/services/group.service';

import * as GroupActions from './group.actions';
import * as GroupSelectors from './group.selectors';

@Injectable()
export class GroupEffects {
  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.loadGroups),
      concatLatestFrom(() => this.store.select(GroupSelectors.selectAllGroups)),
      mergeMap(([, groups]) => {
        if (groups.length === 0) {
          return this.groupService.getGroupList().pipe(
            map((response: GroupListResponce) => {
              const groups = response.Items.map((item) => ({
                id: item.id.S,
                name: item.name.S,
                createdAt: item.createdAt.S,
                createdBy: item.createdBy.S,
              })).sort((a, b) => {
                const userId = localStorage.getItem('uid');

                if (a.createdBy === userId) {
                  return -1;
                }
                if (b.createdBy === userId) {
                  return 1;
                }
                return 0;
              });

              return GroupActions.loadGroupsSuccess({ groups });
            }),
            catchError(() => of(GroupActions.loadGroupsFailure()))
          );
        }
        return of();
      })
    );
  });

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private store: Store
  ) {}
}
