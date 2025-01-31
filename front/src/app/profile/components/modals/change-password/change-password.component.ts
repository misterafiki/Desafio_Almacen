import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  standalone: false,

  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>, private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: AbstractControl) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  accept() {
    if (this.changePasswordForm.valid) {
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}


