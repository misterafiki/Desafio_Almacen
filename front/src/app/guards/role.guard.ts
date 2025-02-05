import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const rolSelected = localStorage.getItem('rolSelected') !== null;
    if (!rolSelected) {
      this.router.navigate(['/selectRol']);
      return false;
    }
    return true;
  }
}
