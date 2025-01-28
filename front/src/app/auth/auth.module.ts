import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './pages/login-page/login-page.component';

import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
