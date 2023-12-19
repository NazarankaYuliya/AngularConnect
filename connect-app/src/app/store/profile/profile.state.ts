import { Profile } from 'src/app/modules/profile/models/profile.model';

export interface ProfileState {
  profile: Profile | null;
}

export const initialProfileState: ProfileState = {
  profile: null,
};
