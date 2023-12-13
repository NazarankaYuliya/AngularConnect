import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { Store } from '@ngrx/store';
import { selectProfile } from 'src/app/store/profile/profile.selectors';
import * as ProfileActions from 'src/app/store/profile/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: Profile = {
    name: '',
    email: '',
    createdAt: '',
    id: '',
  };

  constructor(private profileService: ProfileService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(ProfileActions.loadProfile());
    this.getProfile();
  }

  getProfile() {
    this.store.select(selectProfile).subscribe((profile) => {
      if (profile) {
        this.profileData = profile;
      }
    });
  }
}
