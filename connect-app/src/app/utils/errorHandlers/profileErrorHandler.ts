import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import * as Constants from 'src/app/constants/constants';
import { openSnackBar } from '../openSnackBar';

export function handleProfileError(
  error: HttpErrorResponse,
  snackBar: MatSnackBar
): Observable<never> {
  let errorMessage = Constants.PROFILE_ERROR_MESSAGE;

  if (error.status === 400) {
    if (error.error && error.error.type === 'InvalidUserDataException') {
      errorMessage = Constants.INVALID_USER_DATA_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidTokenException') {
      errorMessage = Constants.INVALID_TOKEN_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidIDException') {
      errorMessage = Constants.INVALID_ID_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'UserNotFoundException') {
      errorMessage = Constants.USER_NOT_FOUND_EXCEPTION_MESSAGE;
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
