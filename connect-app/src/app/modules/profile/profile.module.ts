import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  providers: [ProfileService],
  declarations: [ProfileComponent],
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
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class UserModule {}
