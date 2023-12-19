import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string): void {
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';

    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition,
      horizontalPosition,
    });
  }
}
