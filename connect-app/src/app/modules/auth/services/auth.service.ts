import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import {
  LoginData,
  LoginResponse,
  RegistrationData,
} from 'src/app/modules/auth/models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registrationUrl = 'https://tasks.app.rs.school/angular/registration';
  private loginUrl = 'https://tasks.app.rs.school/angular/login';

  constructor(private http: HttpClient) {}

  register(userData: RegistrationData): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<void>(this.registrationUrl, userData, { headers });
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
        })
      );
  }

  isAuthenticatedUser(): boolean {
    const authToken = localStorage.getItem('token');
    return authToken !== null;
  }
}
