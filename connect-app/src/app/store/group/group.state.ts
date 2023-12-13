import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Group } from 'src/app/modules/communication/models/group.models';

export interface GroupState extends EntityState<Group> {}

export const groupAdapter = createEntityAdapter<Group>();

export const initialGroupState: GroupState = groupAdapter.getInitialState();
