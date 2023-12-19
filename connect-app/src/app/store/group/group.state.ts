import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Group } from 'src/app/modules/communication/models/group.models';

export type GroupState = EntityState<Group>;

export const groupAdapter = createEntityAdapter<Group>();

export const initialGroupState: GroupState = groupAdapter.getInitialState();
