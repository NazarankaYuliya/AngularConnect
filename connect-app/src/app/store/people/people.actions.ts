import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/communication/models/people.models';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction('[User] Load Users Failure');
