import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import {CardComponent}from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { SelectRolPageComponent } from './pages/selectRol-page/selectRol-page.component';
import { SharedModule } from "../shared/shared.module";
import { RecoverPasswordComponent } from './components/modals/recover-password/recover-password.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    CardComponent,
    CardListComponent,
    SelectRolPageComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    SelectRolPageComponent
  ]
})
export class AuthModule { }
