import { createAction, props } from '@ngrx/store';
import {
  Group,
} from 'src/app/modules/communication/models/group.models';

export const loadGroups = createAction('[Group] Load Groups');
export const loadGroupsSuccess = createAction(
  '[Group] Load Groups Success',
  props<{ groups: Group[] }>()
);
export const loadGroupsFailure = createAction('[Group] Load Groups Failure');

export const addGroup = createAction(
  '[Group] Add Group',
  props<{ group: Group }>()
);

export const addGroupSuccess = createAction(
  '[Group] Add Group Success',
  props<{ group: Group }>()
);

export const removeGroup = createAction(
  '[Group] Remove Group',
  props<{ groupId: string }>()
);

export const removeGroupSuccess = createAction(
  '[Group] Remove Group Success',
  props<{ groupId: string }>()
);
