import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as ProfileActions from 'src/app/store/profile/profile.actions';
import { selectProfile } from 'src/app/store/profile/profile.selectors';
import { showSuccessToast } from 'src/app/utils/openSnackBar';

import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData$?: Observable<Profile | null>;
  editMode = false;

  profileData: Profile = {
    name: '',
    email: '',
    createdAt: '',
    id: '',
  };

  profileDataCopy: Profile = {
    name: '',
    email: '',
    createdAt: '',
    id: '',
  };

  constructor(
    private profileService: ProfileService,
    private store: Store,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.store.dispatch(ProfileActions.loadProfile());
    this.profileData$ = this.store.select(selectProfile).pipe(
      tap((profile) => {
        if (profile) {
          this.profileDataCopy = { ...profile };
        }
      })
    );
  }

  logout() {
    this.profileService.logout().subscribe(() => {
      showSuccessToast('You are logged out', this.snackBar);
      localStorage.clear();
      this.router.navigate(['/signin']);
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.profileData = { ...this.profileDataCopy };
    }
  }

  saveProfile() {
    this.toggleEditMode();
    console.log(this.profileData);

    this.profileService
      .updateProfile({ name: this.profileData.name })
      .subscribe(() => {
        showSuccessToast('Profile updated successfully', this.snackBar);
        this.store.dispatch(
          ProfileActions.updateProfile({ profile: this.profileData })
        );
      });
  }
}
