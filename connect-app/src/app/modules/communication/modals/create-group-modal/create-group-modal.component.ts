import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../../services/group.service';
import { SnackbarService } from 'src/app/services/snackBar.service';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
})
export class CreateGroupModalComponent {
  createGroupForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateGroupModalComponent>,
    private fb: FormBuilder,
    private groupService: GroupService
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

    this.groupService
      .createGroup(this.createGroupForm.value)
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close({
            submitted: true,
            data: { name: this.createGroupForm.value, groupID: res.groupID },
          });
        }
      });
  }

  onClose(): void {
    this.dialogRef.close({ submitted: false });
  }
}
