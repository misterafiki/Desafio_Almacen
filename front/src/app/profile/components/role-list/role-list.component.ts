import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-role-list',
  standalone: false,

   template: `
   <mat-card-title class="mt-2 text-center" *ngIf="roles.length > 0">ROLES</mat-card-title>
    <mat-card-content>
      <mat-chip-set>
        <mat-chip *ngFor="let role of roles" class="blue-chip">{{ role }}</mat-chip>
      </mat-chip-set>
    </mat-card-content>
  `,
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {
  @Input()
  roles = [];
}
