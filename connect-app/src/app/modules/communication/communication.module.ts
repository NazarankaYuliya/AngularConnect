import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupListComponent } from './components/group-list/group-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { CreateGroupModalComponent } from './modals/create-group-modal/create-group-modal.component';
import { ModalService } from './services/modal.service';
import { ConversationService } from './services/conversation.service';
import { GroupService } from './services/group.service';
import { PeopleService } from './services/people.service';

@NgModule({
  providers: [ModalService, ConversationService, GroupService, PeopleService],

  declarations: [
    GroupListComponent,
    PeopleListComponent,
    MainPageComponent,
    ConfirmationComponent,
    CreateGroupModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
      },
    ]),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class CommunicationModule {}
