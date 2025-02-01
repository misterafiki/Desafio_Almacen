import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-recover-password',
  standalone: false,

  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  MailForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<RecoverPasswordComponent>, private fb: FormBuilder) {
    this.MailForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }
  accept() {
    if (this.MailForm.valid) {
      this.dialogRef.close(this.MailForm);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
