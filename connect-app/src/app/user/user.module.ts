import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './components/profile/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileComponent
  ],
  imports: [CommonModule],
})
export class UserModule {}
