import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-img',
  standalone: false,

  templateUrl: './change-img.component.html',
  styleUrl: './change-img.component.css'
})
export class ChangeImgComponent {
  changeImgForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangeImgComponent>
  ) {
    this.changeImgForm = this.fb.group({
      img: [null, Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.changeImgForm.patchValue({ img: this.selectedFile });
    }
  }

  accept() {
    if (this.changeImgForm.valid) {
      this.dialogRef.close(this.selectedFile);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
