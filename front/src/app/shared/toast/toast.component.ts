import { Component,Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  standalone: false,

  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }
}
