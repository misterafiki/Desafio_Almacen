import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChangePasswordComponent } from '../../components/modals/change-password/change-password.component';
import { ChangeImgComponent } from '../../components/modals/change-img/change-img.component';

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
    const dialogPassword = this.dialog.open(
      ChangePasswordComponent,{
        width: '500px',
        height: '500px',
      }
    )

    dialogPassword.afterClosed().subscribe(
      (result) => {
        if(result) {
          
        }
      }
    )
  }
  changeImg(){
    const dialogImg = this.dialog.open(
      ChangeImgComponent,{
        width: '500px',
        height: '300px',
      }
    )
    dialogImg.afterClosed().subscribe(
      (result) => {
        if(result) {

        }
      }
    )
  }
}
