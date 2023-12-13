import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import {
  ConversationEffects,
  GroupEffects,
  ProfileEffects,
  conversationReducer,
  groupReducer,
  profileReducer,
} from './store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/people/people.reducer';
import { UserEffects } from './store/people/people.effects';
import { ApiService } from './api.service';

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
    }),
    EffectsModule.forRoot([
      GroupEffects,
      UserEffects,
      ConversationEffects,
      ProfileEffects,
    ]),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
