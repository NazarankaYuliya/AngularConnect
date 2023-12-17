import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable } from 'rxjs';
import { RequestBody } from 'src/app/api.models';
import { ApiService } from 'src/app/api.service';
import { handleProfileError } from 'src/app/utils/errorHandlers/profileErrorHandler';

import { ProfileResponse } from '../models/profile.model';

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

  updateProfile(data: RequestBody): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}`, data);
  }

  logout(): Observable<void> {
    return this.apiService.delete<void>(`${this.logoutEndpoint}`);
  }
}
