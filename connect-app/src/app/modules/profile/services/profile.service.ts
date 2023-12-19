import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBody } from 'src/app/api.models';
import { ApiService } from 'src/app/services/api.service';

import { ProfileResponse } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private endpoint = 'profile';
  private logoutEndpoint = 'logout';

  constructor(private apiService: ApiService) {}

  getProfile(): Observable<ProfileResponse> {
    return this.apiService.get<ProfileResponse>(`${this.endpoint}`);
  }

  updateProfile(data: RequestBody): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}`, data);
  }

  logout(): Observable<void> {
    return this.apiService.delete<void>(`${this.logoutEndpoint}`);
  }
}
