import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestBody } from '../api.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://angularconnectbackend.onrender.com';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  post<T>(endpoint: string, body: RequestBody): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }

  put<T>(endpoint: string, body: RequestBody): Observable<T> {
    const headers = this.createHeaders();
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.createHeaders();
    const options = { headers };
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options);
  }

  private createHeaders(): HttpHeaders {
    const uid = localStorage.getItem('uid') ?? '';
    const email = localStorage.getItem('email') ?? '';
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('rs-uid', uid)
      .set('rs-email', email)
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
