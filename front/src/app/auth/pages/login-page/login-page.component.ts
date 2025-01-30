import { Component  } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
    private titleService: Title,
    private router:Router
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
    console.log("funciona")
  }
}
