import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userAdapter, UserState } from './people.state';

export const selectUserState = createFeatureSelector<UserState>('users');

export const { selectAll: selectAllUsers } = userAdapter.getSelectors(selectUserState);

export const selectUsers = createSelector(selectUserState, selectAllUsers);
