import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './services/profile.service';
import { ModalService } from '../communication/services/modal.service';
import { SnackbarService } from 'src/app/services/snackBar.service';

@NgModule({
  providers: [ProfileService, ModalService, SnackbarService],
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
    MatDialogModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class UserModule {}
