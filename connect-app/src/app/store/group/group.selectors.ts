import { createFeatureSelector, createSelector } from '@ngrx/store';

import { groupAdapter, GroupState } from './group.state';

export const selectGroupState = createFeatureSelector<GroupState>('groups');

export const {
  selectAll: selectAllGroups,
  selectEntities: selectGroupEntities,
  selectIds: selectGroupIds,
  selectTotal: selectTotalGroups,
} = groupAdapter.getSelectors(selectGroupState);

export const selectGroupById = (groupId: string) =>
  createSelector(
    selectGroupEntities,
    (groupEntities) => groupEntities[groupId]
  );
