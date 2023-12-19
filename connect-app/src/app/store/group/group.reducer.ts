import { createReducer, on } from '@ngrx/store';

import * as GroupActions from './group.actions';
import { groupAdapter, initialGroupState } from './group.state';

export const groupReducer = createReducer(
  initialGroupState,
  on(GroupActions.loadGroupsSuccess, (state, { groups }) =>
    groupAdapter.setAll(groups, state)
  ),
  on(GroupActions.addGroup, (state, { group }) =>
    groupAdapter.addOne(group, state)
  ),
  on(GroupActions.removeGroup, (state, { groupId }) =>
    groupAdapter.removeOne(groupId, state)
  )
);
