import { Injectable } from '@angular/core';
import {
  Actions, concatLatestFrom, createEffect, ofType
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  take,
} from 'rxjs/operators';
import {
  mapProfileResponseToProfile, Profile,
  ProfileResponse
} from 'src/app/modules/profile/models/profile.model';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';

import * as ProfileActions from './profile.actions';
import * as ProfileSelectors from './profile.selectors';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.loadProfile),
    concatLatestFrom(() => this.store.select((ProfileSelectors.selectProfile))),
    take(1),
    mergeMap(() => this.profileService.getProfile().pipe(
      map((response: ProfileResponse) => {
        const loadedProfile: Profile =              mapProfileResponseToProfile(response);
        return ProfileActions.loadProfileSuccess({
          profile: loadedProfile,
        });
      }),
      catchError(() => EMPTY)
    ))
  )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store
  ) {}
}
