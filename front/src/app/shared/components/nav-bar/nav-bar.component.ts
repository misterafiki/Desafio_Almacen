import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  // Simulacion de roles del usuario (se cogeria del localStorage?)
  user = {
    name: 'Juan Pérez',
    roles: ['admin','direccion']
  };
  selectedRole: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ){
    this.authService.selectedRole$.subscribe(role => {
      this.selectedRole = role;
    });
  }

  hasRole(role: string): boolean {
    return this.user.roles.includes(role);
  }

  multipleRoles(): boolean {
    return this.user.roles.length > 1;
  }

  changeRole(role: string) {
    // logica de cambio
    console.log(`Cambiando al rol: ${role}`);
    this.authService.setSelectedRole(role);
  }
}
