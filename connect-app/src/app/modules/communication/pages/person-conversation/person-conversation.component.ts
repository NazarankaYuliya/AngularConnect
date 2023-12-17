import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ConversationActions from 'src/app/store/conversation/conversation.actions';
import * as MessagesActions from 'src/app/store/personMessages/messages.actions';
import * as MessagesSelectors from 'src/app/store/personMessages/messages.selectors';
import { ConversationService } from '../../services/conversation.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-person-conversation',
  templateUrl: './person-conversation.component.html',
  styleUrls: ['./person-conversation.component.scss'],
})
export class PersonConversationComponent implements OnInit {
  conversationId: string | null = null;
  userId: string | null = null;
  messages$?: Observable<any[]>;
  newMessageForm: FormGroup;
  updateCountdown = 0;

  constructor(
    private conversationService: ConversationService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.newMessageForm = this.fb.group({
      newMessage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('uid') || '';
    this.conversationId = this.route.snapshot.paramMap.get('conversationID');

    if (this.conversationId) {
      this.store.dispatch(
        MessagesActions.loadConversationMessages({
          conversationID: this.conversationId,
        })
      );
      this.messages$ = this.store.select(
        MessagesSelectors.selectMessagesByConversationId(this.conversationId)
      );
    }
  }

  sendMessage(conversationId: string) {
    this.conversationService
      .addMessage(conversationId, this.newMessageForm.value.newMessage)
      .subscribe(() => {
        this.store.dispatch(
          MessagesActions.loadConversationMessages({
            conversationID: conversationId,
          })
        );

        this.newMessageForm.reset();
      });
  }

  updateConversationMessages(conversationId: string) {
    if (this.updateCountdown === 0) {
      this.store.dispatch(
        MessagesActions.loadConversationMessages({
          conversationID: conversationId,
        })
      );

      this.updateCountdown = 60;
      const countdownInterval = setInterval(() => {
        this.updateCountdown -= 1;
        if (this.updateCountdown === 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  }

  deleteConversation(conversationId: string): void {
    const dialogRef = this.modalService.confirmationModalOpen(
      'Are you sure you want to delete this conversation?'
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.conversationService
          .deleteConversation(conversationId)
          .subscribe(() => {
            this.store.dispatch(
              ConversationActions.removeConversation({ conversationId })
            );
            this.router.navigate(['/']);
          });
      }
    });
  }
}
