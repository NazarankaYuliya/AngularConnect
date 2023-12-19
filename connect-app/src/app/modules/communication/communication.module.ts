import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { GroupListComponent } from './components/group-list/group-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { CreateGroupModalComponent } from './modals/create-group-modal/create-group-modal.component';
import { GroupDialogComponent } from './pages/group-dialog/group-dialog.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ConversationService } from './services/conversation.service';
import { GroupService } from './services/group.service';
import { ModalService } from './services/modal.service';
import { PeopleService } from './services/people.service';
import { PersonConversationComponent } from './pages/person-conversation/person-conversation.component';
import { SnackbarService } from 'src/app/services/snackBar.service';

@NgModule({
  providers: [
    ModalService,
    ConversationService,
    GroupService,
    PeopleService,
    SnackbarService,
  ],

  declarations: [
    GroupListComponent,
    PeopleListComponent,
    MainPageComponent,
    ConfirmationComponent,
    CreateGroupModalComponent,
    GroupDialogComponent,
    PersonConversationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
      },
      {
        path: 'group/:groupID',
        component: GroupDialogComponent,
      },
      {
        path: 'conversation/:conversationID',
        component: PersonConversationComponent,
      },
    ]),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class CommunicationModule {}
