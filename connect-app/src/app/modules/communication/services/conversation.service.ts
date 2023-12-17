import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { ApiService } from '../../../api.service';
import { MessagesResponse } from '../models/messages.models';
import { handleGroupDeleteError } from 'src/app/utils/errorHandlers/groupsErrorHandler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private endpoint = 'conversations';

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  getConversationsList(): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/list`);
  }

  createConversation(companionId: string): Observable<any> {
    const body = { companion: companionId };
    return this.apiService.post<any>(`${this.endpoint}/create`, body);
  }

  getConversationMessages(
    conversationID: string,
    since: number = 0
  ): Observable<MessagesResponse> {
    return this.apiService.get<MessagesResponse>(
      `${this.endpoint}/read?conversationID=${conversationID}&since=${since}`
    );
  }

  addMessage(conversationID: string, message: string): Observable<void> {
    const body = { conversationID: conversationID, message };
    return this.apiService.post<void>(`${this.endpoint}/append`, body);
  }

  deleteConversation(conversationID: string): Observable<void> {
    return this.apiService
      .delete<void>(`${this.endpoint}/delete?conversationID=${conversationID}`)
      .pipe(
        catchError((error) => handleGroupDeleteError(error, this.snackBar))
      );
  }
}
