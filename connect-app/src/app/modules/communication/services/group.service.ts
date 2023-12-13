import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGroupResponce, GroupListResponce } from '../models/group.models';
import { ApiService } from '../../../api.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private endpoint = 'groups';

  constructor(private apiService: ApiService) {}

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
}
