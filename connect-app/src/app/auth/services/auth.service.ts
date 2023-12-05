import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
  LoginData,
  LoginResponse,
  RegistrationData,
} from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registrationUrl = 'https://tasks.app.rs.school/angular/registration';
  private loginUrl = 'https://tasks.app.rs.school/angular/login';

  constructor(private http: HttpClient) {}

  register(userData: RegistrationData): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<void>(this.registrationUrl, userData, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      if (error.error && error.error.type === 'InvalidFormDataException') {
        console.error('Invalid form data:', error.error.message);
      } else if (
        error.error &&
        error.error.type === 'PrimaryDuplicationException'
      ) {
        console.error('User already exists:', error.error.message);
      } else {
        console.error('Unknown error:', error);
      }
    } else {
      console.error('Server error:', error);
    }

    return throwError('Something went wrong. Please try again later.');
  }

  login(loginData: LoginData): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<LoginResponse>(this.loginUrl, loginData, { headers })
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('uid', response.uid);
          localStorage.setItem('email', loginData.email);
        }),
        catchError((error) => this.handleError(error))
      );
  }
}
