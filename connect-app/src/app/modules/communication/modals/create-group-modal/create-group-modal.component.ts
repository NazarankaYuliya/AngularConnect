import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
})
export class CreateGroupModalComponent {
  createGroupForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateGroupModalComponent>,
    private fb: FormBuilder
  ) {
    this.createGroupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s]+$/),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.createGroupForm.invalid) {
      return;
    }
    this.dialogRef.close({ submitted: true, data: this.createGroupForm.value });
  }

  onClose(): void {
    this.dialogRef.close({ submitted: false });
  }
}
