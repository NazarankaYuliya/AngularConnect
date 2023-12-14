import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { ConversationService } from '../../services/conversation.service';
import {
  ConversationListItem,
  PeopleListItem,
  PeopleListResponse,
  User,
} from '../../models/people.models';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/people/people.actions';
import * as UserSelectors from 'src/app/store/people/people.selectors';
import * as ConversationSelectors from 'src/app/store/conversation/conversation.selectors';
import * as ConversationActions from 'src/app/store/conversation/conversation.actions';
import { showSuccessToast } from 'src/app/utils/openSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  conversationList: ConversationListItem[] = [];
  companions: string[] = [];
  people: User[] = [];
  updateCountdown: number = 0;
  userId = localStorage.getItem('uid');

  constructor(
    private peopleService: PeopleService,
    private conversationService: ConversationService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.store.dispatch(ConversationActions.loadConversations());
    this.store.dispatch(UserActions.loadUsers());
    this.getConversationsList();
    this.getPeopleList();
  }

  getPeopleList(): void {
    this.store.select(UserSelectors.selectAllUsers).subscribe(
      (users) => {
        this.people = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getConversationsList(): void {
    this.store.select(ConversationSelectors.selectAllConversations).subscribe(
      (conversations) => {
        this.conversationList = conversations;
        this.companions = conversations.map(
          (conversation) => conversation.companionID.S
        );
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
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
    if (this.updateCountdown === 0) {
      this.updateConversationList();
      this.updateUsersList();

      this.updateCountdown = 60;
      const countdownInterval = setInterval(() => {
        this.updateCountdown--;
        if (this.updateCountdown === 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  }

  createConversation(companionId: string) {
    this.conversationService
      .createConversation(companionId)
      .subscribe((res) => {
        const newConversation: ConversationListItem = {
          id: { S: res.conversationID },
          companionID: { S: companionId },
        };
        this.store.dispatch(
          ConversationActions.addConversation({ conversation: newConversation })
        );

        showSuccessToast('Conversation created', this.snackBar);
      });
  }
}
