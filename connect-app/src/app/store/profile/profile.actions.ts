import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/modules/profile/models/profile.model';

export const loadProfile = createAction('[Profile] Load Profile');
export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ profile: Profile }>()
);
export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure'
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ profile: Profile }>()
);
