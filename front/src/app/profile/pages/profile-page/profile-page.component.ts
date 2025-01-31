import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../../shared/toast/toast.component';

import { ChangePasswordComponent } from '../../components/modals/change-password/change-password.component';
import { ChangeImgComponent } from '../../components/modals/change-img/change-img.component';

import { Title } from '@angular/platform-browser';

import { ProfileService } from '../../services/profile.service';
import { GetUserDataResponse, userData} from '../../interfaces/profile.interfaces';

@Component({
  selector: 'app-profile-page',
  standalone: false,

  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  userData ?: userData
  userRoles?: Array<string>

  constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private profileService:ProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Perfil');

    this.userRoles = JSON.parse(localStorage.getItem('roles')!);

    this.profileService.getUserData().subscribe(
      response => {
        this.userData = response.data
      },
      err => {
        console.log(err)
      });
      console.log(this.userData)
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
    dialogImg.afterClosed().pipe(
      filter(result => !!result),
      switchMap(result =>
        this.profileService.changeImg(result)
      )
    ).subscribe(
      result => {
        this.userData!!.img = result.secure_url
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message: 'Imagen actualizada correctamente', status: 'true' },
          duration: 3000
        });
      },
      err => {
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message: 'ha sucedido un error intente mas tarde', status: 'false' },
          duration: 3000
        });
      }
    );
  }
}
