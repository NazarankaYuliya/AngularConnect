import { MatSnackBar } from '@angular/material/snack-bar';

export function openSnackBar(message: string, snackBar: MatSnackBar): void {
  snackBar.open(message, 'Close', {
    duration: 5000,
  });
}

export function showSuccessToast(message: string, snackBar: MatSnackBar): void {
  openSnackBar(message, snackBar);
}
