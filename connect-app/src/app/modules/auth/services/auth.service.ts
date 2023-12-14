import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap } from 'rxjs';
import {
  LoginData,
  LoginResponse,
  RegistrationData,
} from 'src/app/modules/auth/models/models';
import {
  handleLoginError,
  handleRegisterError,
} from 'src/app/utils/errorHandlers/authErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registrationUrl = 'https://tasks.app.rs.school/angular/registration';
  private loginUrl = 'https://tasks.app.rs.school/angular/login';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  register(userData: RegistrationData): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<void>(this.registrationUrl, userData, { headers })
      .pipe(catchError((error) => handleRegisterError(error, this.snackBar)));
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
        catchError((error) => handleLoginError(error, this.snackBar))
      );
  }

  isAuthenticatedUser(): boolean {
    const authToken = localStorage.getItem('token');
    return authToken !== null;
  }
}
