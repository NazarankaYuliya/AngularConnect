import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import {
  LoginData,
  LoginResponse,
  RegistrationData,
} from 'src/app/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  handleLoginError,
  handleRegisterError,
  openSnackBar,
} from 'src/app/utils/error-handling';

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

  showSuccessToast(message: string): void {
    openSnackBar(message, this.snackBar);
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
}
