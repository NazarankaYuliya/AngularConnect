import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { CreateGroupResponce, GroupListResponce } from '../models/group.models';
import { MessagesResponse } from '../models/messages.models';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private endpoint = 'groups';

  constructor(private apiService: ApiService) {}

  setCreatorId(creatorId: string): void {
    localStorage.setItem('groupCreatorId', creatorId);
  }

  getCreatorId(): string | null {
    return localStorage.getItem('groupCreatorId');
  }

  getGroupList(): Observable<GroupListResponce> {
    return this.apiService.get<GroupListResponce>(`${this.endpoint}/list`);
  }

  createGroup(name: string): Observable<CreateGroupResponce> {
    const body = { name };
    return this.apiService.post<CreateGroupResponce>(
      `${this.endpoint}/create`,
      body
    );
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.apiService.delete<void>(
      `${this.endpoint}/delete?groupID=${groupId}`
    );
  }

  getGroupMessages(
    groupId: string,
    since: number = 0
  ): Observable<MessagesResponse> {
    return this.apiService.get<MessagesResponse>(
      `${this.endpoint}/read?groupID=${groupId}&since=${since}`
    );
  }

  addMessage(groupId: string, message: string): Observable<void> {
    const body = { groupID: groupId, message };
    return this.apiService.post<void>(`${this.endpoint}/append`, body);
  }
}
