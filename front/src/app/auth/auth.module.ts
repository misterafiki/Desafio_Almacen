import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './pages/login-page/login-page.component';

import { MaterialModule } from '../material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import {CardComponent}from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { SelectRolPageComponent } from './pages/selectRol-page/selectRol-page.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    LoginPageComponent,
    CardComponent,
    CardListComponent,
    SelectRolPageComponent,
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
