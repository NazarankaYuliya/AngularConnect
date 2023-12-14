import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ProfileResponse } from '../models/profile.model';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { handleProfileError } from 'src/app/utils/errorHandlers/profileErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private endpoint = 'profile';
  private logoutEndpoint = 'logout';

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  getProfile(): Observable<ProfileResponse> {
    return this.apiService
      .get<ProfileResponse>(`${this.endpoint}`)
      .pipe(catchError((error) => handleProfileError(error, this.snackBar)));
  }

  updateProfile(data: { name: string }): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}`, data);
  }

  logout(): Observable<void> {
    return this.apiService.delete<void>(`${this.logoutEndpoint}`);
  }
}
