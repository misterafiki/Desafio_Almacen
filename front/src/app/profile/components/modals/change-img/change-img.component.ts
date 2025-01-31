import { Component } from '@angular/core';


import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-img',
  standalone: false,

  templateUrl: './change-img.component.html',
  styleUrl: './change-img.component.css'
})
export class ChangeImgComponent {
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<ChangeImgComponent>
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  accept() {
    if (this.selectedFile) {
      this.dialogRef.close(this.selectedFile);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
