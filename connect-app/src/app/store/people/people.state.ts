import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from 'src/app/modules/communication/models/people.models';

function selectUserId(user: User): string {
  return user.uid;
}

export const userAdapter = createEntityAdapter<User>({
  selectId: selectUserId,
});

export type UserState = EntityState<User>;

export const initialUserState: UserState = userAdapter.getInitialState();
