import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as ProfileActions from 'src/app/store/profile/profile.actions';
import { selectProfile } from 'src/app/store/profile/profile.selectors';

import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { ModalService } from 'src/app/modules/communication/services/modal.service';
import { SnackbarService } from 'src/app/services/snackBar.service';

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
    private snackbarService: SnackbarService,
    private modalService: ModalService
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
    const dialogRef = this.modalService.confirmationModalOpen(
      'Are you sure you want to logout?'
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.profileService.logout().subscribe(() => {
          this.snackbarService.openSnackBar('You are logged out');
          localStorage.clear();
          this.router.navigate(['/signin']);
        });
      }
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

    this.profileService
      .updateProfile({ name: this.profileData.name })
      .subscribe(() => {
        this.snackbarService.openSnackBar('Profile updated successfully');
        this.store.dispatch(
          ProfileActions.updateProfile({ profile: this.profileData })
        );
      });
  }
}
