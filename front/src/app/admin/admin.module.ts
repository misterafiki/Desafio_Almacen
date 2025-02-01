import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from '../material/material.module';
import {RouterModule, RouterOutlet} from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import {FormsModule} from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    UserFormComponent,
    AdminDashboardComponent,
    UsersListComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class AdminModule { }
