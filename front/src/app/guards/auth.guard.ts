import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log("hola")
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    const hasRoles = localStorage.getItem('roles') !== null;
    if (!isAuthenticated && !hasRoles) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
