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
  conversationReducer,
  groupReducer,
} from './store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/people/people.reducer';
import { UserEffects } from './store/people/people.effects';

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
    }),
    EffectsModule.forRoot([GroupEffects, UserEffects, ConversationEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
