import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

@NgModule({
  providers: [AuthService],
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'signin',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: RegisterComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  exports: [RouterModule],
})
export class AuthModule {}
