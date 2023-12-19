import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as GroupActions from 'src/app/store/group/group.actions';
import * as MessagesActions from 'src/app/store/groupMessages/messages.actions';
import * as MessagesSelectors from 'src/app/store/groupMessages/messages.selectors';

import { GroupService } from '../../services/group.service';
import { ModalService } from '../../services/modal.service';
import { showSuccessToast } from 'src/app/utils/openSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
})
export class GroupDialogComponent implements OnInit {
  groupId: string | null = null;
  creatorId: string | null = null;
  userId: string | null = null;
  messages$?: Observable<any[]>;
  newMessageForm: FormGroup;
  updateCountdown = 0;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private store: Store,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.newMessageForm = this.fb.group({
      newMessage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('uid') || '';
    this.groupId = this.route.snapshot.paramMap.get('groupID');
    this.creatorId = this.groupService.getCreatorId();

    if (this.groupId) {
      this.store.dispatch(
        MessagesActions.loadMessages({ groupID: this.groupId })
      );
      this.messages$ = this.store.select(
        MessagesSelectors.selectMessagesByGroupId(this.groupId)
      );
    }
  }

  sendMessage(groupId: string) {
    const newMessageText: string = this.newMessageForm.value.newMessage;

    const newMessage = {
      createdAt: new Date().getTime().toString(),
      authorID: this.userId || '',
      message: newMessageText,
    };
    if (groupId) {
      this.groupService.addMessage(groupId, newMessageText).subscribe(() => {
        this.store.dispatch(MessagesActions.loadMessages({ groupID: groupId }));
        this.newMessageForm.reset();
      });
    }
  }

  deleteGroup(groupId: string): void {
    const dialogRef = this.modalService.confirmationModalOpen(
      'Are you sure you want to delete this group?'
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupService.deleteGroup(groupId).subscribe(() => {
          this.store.dispatch(GroupActions.removeGroup({ groupId }));
          this.router.navigate(['/']);
          showSuccessToast('Group deleted', this.snackBar);
        });
      }
    });
  }
  updateGroupMessages(groupId: string) {
    if (this.updateCountdown === 0) {
      this.store.dispatch(MessagesActions.loadMessages({ groupID: groupId }));

      this.updateCountdown = 60;
      const countdownInterval = setInterval(() => {
        this.updateCountdown -= 1;
        if (this.updateCountdown === 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  }
}
