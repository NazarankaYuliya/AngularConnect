import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { ProfileState, initialProfileState } from './profile.state';

export const profileReducer = createReducer(
  initialProfileState,
  on(ProfileActions.loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
  }))
);
