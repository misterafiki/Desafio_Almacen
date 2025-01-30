import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { SelectRolPageComponent } from './auth/pages/selectRol-page/selectRol-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'selectRol', component:SelectRolPageComponent},
  { path: 'profile', component:ProfilePageComponent },





  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
