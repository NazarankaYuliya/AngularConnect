import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import * as Constants from 'src/app/constants/constants';

import { openSnackBar } from '../openSnackBar';

export function handleRegisterError(
  error: HttpErrorResponse,
  snackBar: MatSnackBar
): Observable<never> {
  let errorMessage = Constants.FORM_DATA_ERROR_MESSAGE;

  if (error.status === 400) {
    if (error.error && error.error.type === 'InvalidFormDataException') {
      errorMessage = Constants.INVALID_FORM_DATA_MESSAGE + error.error.message;
    } else if (
      error.error
      && error.error.type === 'PrimaryDuplicationException'
    ) {
      errorMessage = Constants.USER_ALREADY_EXISTS_MESSAGE + error.error.message;
    } else {
      errorMessage = Constants.UNKNOWN_ERROR_MESSAGE;
    }
  } else {
    errorMessage = Constants.SERVER_ERROR_MESSAGE;
  }

  console.error(errorMessage);
  openSnackBar(errorMessage, snackBar);

  return throwError(errorMessage);
}

export function handleLoginError(
  error: HttpErrorResponse,
  snackBar: MatSnackBar
): Observable<never> {
  let errorMessage = Constants.FORM_DATA_ERROR_MESSAGE;

  if (error.status === 400) {
    if (error.error && error.error.type === 'InvalidFormDataException') {
      errorMessage = Constants.INVALID_FORM_DATA_MESSAGE + error.error.message;
    } else if (error.error && error.error.type === 'NotFoundException') {
      errorMessage = Constants.EMAIL_PASSWORD_NOT_FOUND_MESSAGE;
    } else {
      errorMessage = Constants.UNKNOWN_ERROR_MESSAGE;
    }
  } else {
    errorMessage = Constants.SERVER_ERROR_MESSAGE;
  }

  console.error(errorMessage);
  openSnackBar(errorMessage, snackBar);

  return throwError(errorMessage);
}
