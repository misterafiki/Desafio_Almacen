import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../components/modals/change-password/change-password.component';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-page',
  standalone: false,

  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  constructor(
    private titleService: Title,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Perfil');
  }
  changePassword(){
    const dialog = this.dialog.open(
      ChangePasswordComponent,{
        width: '500px',
        height: '500px',
      }
    )
  }
}
