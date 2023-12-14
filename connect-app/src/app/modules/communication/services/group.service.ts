import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CreateGroupResponce, GroupListResponce } from '../models/group.models';
import { ApiService } from '../../../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  handleGroupCreateError,
  handleGroupDeleteError,
  handleGroupLoadError,
} from 'src/app/utils/errorHandlers/groupsErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private endpoint = 'groups';

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  getGroupList(): Observable<GroupListResponce> {
    return this.apiService
      .get<GroupListResponce>(`${this.endpoint}/list`)
      .pipe(catchError((error) => handleGroupLoadError(error, this.snackBar)));
  }

  createGroup(name: string): Observable<CreateGroupResponce> {
    const body = { name };
    return this.apiService
      .post<CreateGroupResponce>(`${this.endpoint}/create`, body)
      .pipe(
        catchError((error) => handleGroupCreateError(error, this.snackBar))
      );
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.apiService
      .delete<void>(`${this.endpoint}/delete?groupID=${groupId}`)
      .pipe(
        catchError((error) => handleGroupDeleteError(error, this.snackBar))
      );
  }
}
