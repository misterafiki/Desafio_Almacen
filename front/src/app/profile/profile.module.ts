import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileImgComponent } from './components/profile-img/profile-img.component';
import { RoleListComponent } from './components/role-list/role-list.component';



@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileImgComponent,
    RoleListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ]
})
export class ProfileModule {

}
