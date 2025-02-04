import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { SelectRolPageComponent } from './auth/pages/selectRol-page/selectRol-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import {AdminDashboardComponent} from './admin/pages/admin-dashboard/admin-dashboard.component';
import {UsersListComponent} from './admin/pages/users-list/users-list.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdministradorGuard } from './guards/administrador.guard';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'selectRol', component:SelectRolPageComponent,canActivate: [AuthGuard]},
  { path: 'profile', component:ProfilePageComponent,canActivate: [AuthGuard,RoleGuard] },
  { path: 'home', component:HomePageComponent,canActivate: [AuthGuard,RoleGuard]},
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'users', component: UsersListComponent },
      //{ path: 'subjects', component: SubjectListComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ],
    canActivate: [AuthGuard,RoleGuard,AdministradorGuard]
  },




  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
