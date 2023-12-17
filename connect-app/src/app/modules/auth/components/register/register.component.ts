import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegistrationData } from 'src/app/modules/auth/models/models';
import { showSuccessToast } from 'src/app/utils/openSnackBar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]{1,40}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const registrationData: RegistrationData = this.registrationForm.value;

      this.authService.register(registrationData).subscribe(() => {
        showSuccessToast('Registration successful', this.snackBar);
        this.router.navigate(['/signin']);
      });
    }
  }
}
