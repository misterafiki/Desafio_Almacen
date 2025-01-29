import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(
    private router: Router
  ){}
  // Simulacion de roles del usuario (se cogeria del localStorage?)

  user = {
    name: 'Juan Pérez',
    roles: ['admin','direccion']
  };

  hasRole(role: string): boolean {
    return this.user.roles.includes(role);
  }

  multipleRoles(): boolean {
    return this.user.roles.length > 1;
  }

  changeRole(role: string) {
    // logica de cambio

    console.log(`Cambiando al rol: ${role}`);
  }
}
