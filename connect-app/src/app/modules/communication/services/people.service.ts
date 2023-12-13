import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleListResponse } from '../models/people.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private endpoint = 'users';

  constructor(private apiService: ApiService) {}

  getPeopleList(): Observable<PeopleListResponse> {
    return this.apiService.get<PeopleListResponse>(`${this.endpoint}`);
  }
}
