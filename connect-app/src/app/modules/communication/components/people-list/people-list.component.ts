import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take, timer } from 'rxjs';
import * as ConversationActions from 'src/app/store/conversation/conversation.actions';
import * as ConversationSelectors from 'src/app/store/conversation/conversation.selectors';
import * as UserActions from 'src/app/store/people/people.actions';
import * as UserSelectors from 'src/app/store/people/people.selectors';
import { showSuccessToast } from 'src/app/utils/openSnackBar';

import {
  ConversationListItem,
  PeopleListItem,
  PeopleListResponse,
  User,
} from '../../models/people.models';
import { ConversationService } from '../../services/conversation.service';
import { PeopleService } from '../../services/people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  conversationList$?: Observable<ConversationListItem[]>;
  companions: string[] = [];
  people$?: Observable<User[]>;
  updateCountdown$?: Observable<number>;
  userId = localStorage.getItem('uid');

  constructor(
    private router: Router,
    private peopleService: PeopleService,
    private conversationService: ConversationService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    combineLatest([
      this.store.dispatch(ConversationActions.loadConversations()),
      this.store.dispatch(UserActions.loadUsers()),
    ]);

    this.initData();
  }

  initData(): void {
    combineLatest([
      (this.conversationList$ = this.store.select(
        ConversationSelectors.selectAllConversations
      )),
      (this.people$ = this.store.select(UserSelectors.selectAllUsers)),
    ]).subscribe(([conversations]) => {
      this.companions = conversations.map(
        (conversation) => conversation.companionID.S
      );
    });
  }

  updateConversationList() {
    this.conversationService.getConversationsList().subscribe(
      (response) => {
        const conversations = response.Items;
        this.store.dispatch(
          ConversationActions.loadConversationsSuccess({ conversations })
        );
      },
      (error) => {
        console.error('Error fetching conversations from the server:', error);
      }
    );
  }

  updateUsersList() {
    this.peopleService.getPeopleList().subscribe(
      (response: PeopleListResponse) => {
        const users = response.Items.map((item: PeopleListItem) => ({
          uid: item.uid.S,
          name: item.name.S,
        }));
        this.store.dispatch(UserActions.loadUsersSuccess({ users }));
      },
      (error) => {
        console.error('Error fetching users from the server:', error);
      }
    );
  }

  updateLists(): void {
    this.updateCountdown$ = timer(0, 1000).pipe(
      take(60),
      map((value) => 60 - value)
    );

    combineLatest([this.updateConversationList(), this.updateUsersList()]);
  }

  createConversation(companionId: string) {
    const existingConversation = this.conversationList$!.pipe(
      map((conversations) =>
        conversations.find((conv) => conv.companionID.S === companionId)
      ),
      take(1)
    );

    existingConversation.subscribe((conversation) => {
      if (conversation) {
        this.router.navigate(['/conversation', conversation.id.S]);
      } else {
        this.conversationService
          .createConversation(companionId)
          .subscribe((res) => {
            const newConversation: ConversationListItem = {
              id: { S: res.conversationID },
              companionID: { S: companionId },
            };
            this.store.dispatch(
              ConversationActions.addConversation({
                conversation: newConversation,
              })
            );
            this.router.navigate(['/conversation', res.conversationID]);
            showSuccessToast('Conversation created', this.snackBar);
          });
      }
    });
  }
}
