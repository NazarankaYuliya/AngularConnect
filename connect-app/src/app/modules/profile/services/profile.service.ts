import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../models/profile.model';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private endpoint = 'profile';

  constructor(private apiService: ApiService) {}

  getProfile(): Observable<ProfileResponse> {
    return this.apiService.get<ProfileResponse>(`${this.endpoint}`);
  }
}
