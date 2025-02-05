import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AdministradorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdministrador = localStorage.getItem('rolSelected') == 'Administrador';
    if (!isAdministrador) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
