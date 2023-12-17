import { createReducer, on } from '@ngrx/store';

import * as UserActions from './people.actions';
import { initialUserState, userAdapter } from './people.state';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, state)
  )
);
