import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as GroupActions from 'src/app/store/group/group.actions';
import * as GroupSelectors from 'src/app/store/group/group.selectors';

import { CreateGroupModalComponent } from '../../modals/create-group-modal/create-group-modal.component';
import { Group, GroupListResponce } from '../../models/group.models';
import { GroupService } from '../../services/group.service';
import { ModalService } from '../../services/modal.service';
import { SnackbarService } from 'src/app/services/snackBar.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groups$?: Observable<Group[]>;
  updateCountdown = 0;
  userId = localStorage.getItem('uid') || '';

  constructor(
    private store: Store,
    private groupService: GroupService,
    private modalService: ModalService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.store.dispatch(GroupActions.loadGroups());
    this.groups$ = this.store.select(GroupSelectors.selectAllGroups);
  }

  setCreatorId(id: string) {
    this.groupService.setCreatorId(id);
  }

  updateList(): void {
    if (this.updateCountdown === 0) {
      this.groupService
        .getGroupList()
        .subscribe((response: GroupListResponce) => {
          const groups = response.Items.map((item) => ({
            id: item.id.S,
            name: item.name.S,
            createdAt: item.createdAt.S,
            createdBy: item.createdBy.S,
          }));

          this.store.dispatch(GroupActions.loadGroupsSuccess({ groups }));
        });

      this.updateCountdown = 60;
      const countdownInterval = setInterval(() => {
        this.updateCountdown -= 1;
        if (this.updateCountdown === 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  }

  createGroup(): void {
    const dialogRef = this.modalService.creationModalOpen(
      CreateGroupModalComponent
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data) {
        const groupName = result.data.name;
        const groupID = result.data.groupID;

        this.snackbarService.openSnackBar('Group created');

        this.store.dispatch(
          GroupActions.addGroup({
            group: {
              id: groupID,
              name: groupName,
              createdAt: '',
              createdBy: this.userId,
            },
          })
        );
      }
    });
  }

  deleteGroup(groupId: string): void {
    const dialogRef = this.modalService.confirmationModalOpen(
      'Are you sure you want to delete this group?'
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupService.deleteGroup(groupId).subscribe(() => {
          this.store.dispatch(GroupActions.removeGroup({ groupId }));
          this.snackbarService.openSnackBar('Group deleted');
        });
      }
    });
  }
}
