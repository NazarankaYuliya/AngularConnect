import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  confirmationModalOpen(
    message: string
  ): MatDialogRef<ConfirmationComponent, boolean> {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      data: { message },
    });
    return dialogRef;
  }

  creationModalOpen<T>(component: Type<T>, data?: any): MatDialogRef<T, any> {
    const dialogRef = this.dialog.open(component, {
      disableClose: true,
      data,
    });
    return dialogRef;
  }
}
