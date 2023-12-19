import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthService } from './services/auth.service';
import { SnackbarService } from 'src/app/services/snackBar.service';

@NgModule({
  providers: [AuthService, SnackbarService],
  declarations: [RegisterComponent, LoginComponent, AuthPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthPageComponent,
      },
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
