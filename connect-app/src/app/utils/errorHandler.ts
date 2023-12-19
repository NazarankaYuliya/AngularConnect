import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackBar.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackbarService: SnackbarService) {}

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      this.handleGenericError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = 'An unknown error occurred';

    if (error.status === 400) {
      if (error.error && error.error.type) {
        errorMessage = this.mapHttpErrorType(error.error.type);
      } else {
        errorMessage = 'Invalid request';
      }
    } else if (error.status === 401) {
      errorMessage =
        'Unauthorized: You are not authorized to access this resource.';
    } else if (error.status === 403) {
      errorMessage =
        'Forbidden: You do not have permission to access this resource.';
    } else if (error.status === 404) {
      errorMessage = 'Not Found: The requested resource could not be found.';
    } else if (error.status === 500) {
      errorMessage = 'Server Error: An internal server error occurred.';
    }

    this.snackbarService.openSnackBar(errorMessage);
    console.error('An error occurred:', error);
  }

  private handleGenericError(error: any): void {
    this.snackbarService.openSnackBar('An unknown error occurred');
    console.error('An error occurred:', error);
  }

  private mapHttpErrorType(errorType: string): string {
    switch (errorType) {
      case 'InvalidFormDataException':
        return 'Invalid form-data request';
      case 'NotFoundException':
        return "Email and/or password doesn't exist in the system.";
      case 'PrimaryDuplicationException':
        return 'User {email} already exists';
      case 'InvalidUserDataException':
        return ' Header should contain "rs-uid", "rs-email" and "Authorization" parameters.';
      case 'InvalidTokenException':
        return 'Header should contain "Authorization" parameter with Bearer code.';
      case 'InvalidIDException':
        return 'Not found';
      case 'InvalidPostData':
        return ` Invalid post data.`;
      case 'RoomReadyException':
        return 'Chat with this id seems not ready yet';
      default:
        return 'Unknown error';
    }
  }
}
