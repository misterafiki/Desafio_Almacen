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
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';



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
    MatPaginatorModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatTooltip,
    MatSort,
    MatSortHeader,
    MatSortModule
  ]
})
export class AdminModule { }
