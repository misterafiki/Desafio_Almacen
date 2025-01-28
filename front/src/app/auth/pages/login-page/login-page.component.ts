import { Component,OnInit  } from '@angular/core';

import {Validators, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.Login(this.loginForm.value)
  }
}
