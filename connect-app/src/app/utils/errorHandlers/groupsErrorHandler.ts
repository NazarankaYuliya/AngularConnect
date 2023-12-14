import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import * as Constants from 'src/app/constants/constants';
import { openSnackBar } from '../openSnackBar';

export function handleGroupLoadError(
  error: HttpErrorResponse,
  snackBar: MatSnackBar
): Observable<never> {
  let errorMessage = Constants.GROUP_ERROR_MESSAGE;

  if (error.status === 400) {
    if (error.error && error.error.type === 'InvalidUserDataException') {
      errorMessage = Constants.INVALID_USER_DATA_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidTokenException') {
      errorMessage = Constants.INVALID_TOKEN_EXCEPTION_MESSAGE;
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

export function handleGroupCreateError(
  error: HttpErrorResponse,
  snackBar: MatSnackBar
): Observable<never> {
  let errorMessage = Constants.GROUP_ERROR_MESSAGE;

  if (error.status === 400) {
    if (error.error && error.error.type === 'InvalidUserDataException') {
      errorMessage = Constants.INVALID_USER_DATA_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidTokenException') {
      errorMessage = Constants.INVALID_TOKEN_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidFormDataException') {
      errorMessage = Constants.INVALID_FORM_DATA_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidPostDataException') {
      errorMessage = Constants.INVALID_POST_DATA_MESSAGE;
    } else if (
      error.error &&
      error.error.type === 'InvalidFormDataParametersException'
    ) {
      errorMessage = Constants.INVALID_FORM_DATA_PARAMETERS_MESSAGE;
    } else if (
      error.error &&
      error.error.type === 'MissingGroupNameException'
    ) {
      errorMessage = Constants.MISSING_GROUP_NAME_MESSAGE;
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

export function handleGroupDeleteError(
  error: HttpErrorResponse,
  snackBar: MatSnackBar
): Observable<never> {
  let errorMessage = Constants.GROUP_ERROR_MESSAGE;

  if (error.status === 400) {
    if (error.error && error.error.type === 'InvalidUserDataException') {
      errorMessage = Constants.INVALID_USER_DATA_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidTokenException') {
      errorMessage = Constants.INVALID_TOKEN_EXCEPTION_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidFormDataException') {
      errorMessage = Constants.INVALID_FORM_DATA_EXCEPTION_MESSAGE;
    } else if (
      error.error &&
      error.error.type === 'MissingQueryParametersException'
    ) {
      errorMessage = Constants.MISSING_GROUP_ID_IN_QUERY_MESSAGE;
    } else if (
      error.error &&
      error.error.type === 'GroupDoesNotExistException'
    ) {
      errorMessage = Constants.GROUP_NOT_EXIST_MESSAGE;
    } else if (error.error && error.error.type === 'InvalidIDException') {
      errorMessage = Constants.INVALID_GROUP_ID_MESSAGE;
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
