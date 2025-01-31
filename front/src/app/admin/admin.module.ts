import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from '../material/material.module';
import {RouterModule, RouterOutlet} from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    UserFormComponent,
    AdminDashboardComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
  ]
})
export class AdminModule { }
