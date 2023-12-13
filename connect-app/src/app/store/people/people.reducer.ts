import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState } from './people.state';
import * as UserActions from './people.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, state)
  )
);
