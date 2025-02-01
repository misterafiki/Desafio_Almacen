import { Component  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RecoverPasswordComponent } from '../../components/modals/recover-password/recover-password.component';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'app-login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm: FormGroup;
  hidePassword = true;
  loginError = ""

  ngOnInit(): void {
    this.titleService.setTitle('Logearse');
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private titleService: Title,
    private router:Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.authService.Login(this.loginForm.value)
          .subscribe(
            response => {
              if (response.token) {
                localStorage.setItem('authToken', response.token);
                if(response.roles){
                  localStorage.setItem('roles', JSON.stringify(response.roles));
                }
                this.router.navigate(['/selectRol'])
              }
            },
            err => {
              console.log(err)
              this.loginForm.reset()
              this.loginError = err.error.msg
            });
  }
  recoverPassword():void{
    const dialogRecoverPassword = this.dialog.open(
          RecoverPasswordComponent,{
            width: '500px',
            height: '300px',
          }
        )
        dialogRecoverPassword.afterClosed().pipe(
          filter(result => !!result),
          switchMap(formValue =>
            this.authService.recoverPassword(formValue.value)
          )
        ).subscribe(
          () => {
            this.snackBar.openFromComponent(ToastComponent, {
              data: { message: 'Revise su correo', status: 'true' },
              duration: 3000
            });
          },
          err => {
            console.log(err)
            this.snackBar.openFromComponent(ToastComponent, {
              data: { message: err.error.msg||'Ha sucedido un error, inténtelo más tarde', status: 'false' },
              duration: 3000
            });
          }
        );
  }
}
