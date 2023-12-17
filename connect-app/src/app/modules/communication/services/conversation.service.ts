import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../api.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private endpoint = 'conversations';

  constructor(private apiService: ApiService) {}

  getConversationsList(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/list`);
  }

  createConversation(companionId: string): Observable<any> {
    const body = { companion: companionId };
    return this.apiService.post<any>(`${this.endpoint}/create`, body);
  }
}
