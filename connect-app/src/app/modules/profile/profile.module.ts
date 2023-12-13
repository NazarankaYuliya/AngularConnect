import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileService } from './services/profile.service';
import { DatePipe } from '@angular/common';

@NgModule({
  providers: [ProfileService],
  declarations: [ProfileComponent, UpdateProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]),
    HttpClientModule,
    MatSnackBarModule,
    DatePipe,
  ],
  exports: [RouterModule],
})
export class UserModule {}
