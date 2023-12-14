import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/modules/auth/models/models';

import { AuthService } from '../../services/auth.service';
import { showSuccessToast } from 'src/app/utils/openSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginData = this.loginForm.value;

      this.authService.login(loginData).subscribe(() => {
        showSuccessToast('You are logged in', this.snackBar);
        this.router.navigate(['/']);
      });
    }
  }
}
