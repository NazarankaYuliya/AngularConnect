import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { ModalService } from '../../services/modal.service';
import { CreateGroupModalComponent } from '../../modals/create-group-modal/create-group-modal.component';
import { Group, GroupListResponce } from '../../models/group.models';
import { Store } from '@ngrx/store';
import * as GroupActions from 'src/app/store/group/group.actions';
import * as GroupSelectors from 'src/app/store/group/group.selectors';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  updateCountdown: number = 0;
  userId = localStorage.getItem('uid') || '';

  constructor(
    private store: Store,
    private groupService: GroupService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.store.dispatch(GroupActions.loadGroups());
    this.getGroups();
  }

  getGroups(): void {
    this.store.select(GroupSelectors.selectAllGroups).subscribe(
      (groups) => {
        this.groups = groups;
        console.log(this.groups);
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  updateList(): void {
    if (this.updateCountdown === 0) {
      this.groupService.getGroupList().subscribe(
        (response: GroupListResponce) => {
          const groups = response.Items.map((item) => ({
            id: item.id.S,
            name: item.name.S,
            createdAt: item.createdAt.S,
            createdBy: item.createdBy.S,
          }));

          this.store.dispatch(GroupActions.loadGroupsSuccess({ groups }));
        },
        (error) => {
          console.error('Error fetching groups from the server:', error);
          this.store.dispatch(GroupActions.loadGroupsFailure());
        }
      );

      this.updateCountdown = 60;
      const countdownInterval = setInterval(() => {
        this.updateCountdown--;
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

        this.groupService.createGroup(groupName).subscribe((res) => {
          this.store.dispatch(
            GroupActions.addGroup({
              group: {
                id: res.groupID,
                name: groupName,
                createdAt: '',
                createdBy: this.userId,
              },
            })
          );
        });

        dialogRef.close();
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
        });
      }
    });
  }
}
