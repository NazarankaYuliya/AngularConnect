import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  ConversationEffects,
  ConversationMessagesEffects,
  conversationMessagesReducer,
  conversationReducer,
  GroupEffects,
  groupReducer,
  MessagesEffects,
  messagesReducer,
  ProfileEffects,
  profileReducer,
} from './store';
import { UserEffects } from './store/people/people.effects';
import { userReducer } from './store/people/people.reducer';
import { SnackbarService } from './services/snackBar.service';
import { GlobalErrorHandler } from './utils/errorHandler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      groups: groupReducer,
      users: userReducer,
      conversations: conversationReducer,
      profile: profileReducer,
      groupMessages: messagesReducer,
      messages: conversationMessagesReducer,
    }),
    EffectsModule.forRoot([
      GroupEffects,
      UserEffects,
      ConversationEffects,
      ProfileEffects,
      MessagesEffects,
      ConversationMessagesEffects,
    ]),
  ],
  providers: [
    ApiService,
    SnackbarService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
