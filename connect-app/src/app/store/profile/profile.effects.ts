import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  take,
} from 'rxjs/operators';
import * as ProfileActions from './profile.actions';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import {
  ProfileResponse,
  Profile,
} from 'src/app/modules/profile/models/profile.model';
import * as ProfileSelectors from './profile.selectors';
import { Store, select } from '@ngrx/store';
import { mapProfileResponseToProfile } from 'src/app/modules/profile/models/profile.model';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      withLatestFrom(this.store.pipe(select(ProfileSelectors.selectProfile))),
      take(1),
      mergeMap(([, profile]) => {
        if (!profile) {
          return this.profileService.getProfile().pipe(
            map((response: ProfileResponse) => {
              const loadedProfile: Profile =
                mapProfileResponseToProfile(response);
              return ProfileActions.loadProfileSuccess({
                profile: loadedProfile,
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
    private profileService: ProfileService,
    private store: Store
  ) {}
}
