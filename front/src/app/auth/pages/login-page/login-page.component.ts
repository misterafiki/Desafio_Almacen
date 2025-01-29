import { Component  } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit(): void {
    this.titleService.setTitle('Logearse');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private titleService: Title
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.authService.Login(this.loginForm.value)
  }
  recoverPassword():void{
    console.log("funciona")
  }
}
