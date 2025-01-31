import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileImgComponent } from './components/profile-img/profile-img.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { ChangeImgComponent } from './components/modals/change-img/change-img.component';
import { ChangePasswordComponent } from './components/modals/change-password/change-password.component';



@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileImgComponent,
    RoleListComponent,
    ChangeImgComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule {

}
