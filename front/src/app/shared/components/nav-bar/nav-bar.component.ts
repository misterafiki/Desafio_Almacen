import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  user = {
    roles: JSON.parse(localStorage.getItem('roles') || '[]')
  };

  selectedRole: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.selectedRole$.subscribe(role => {
      this.selectedRole = role;
    });
  }

  hasRole(role: string): boolean {
    // return this.user.roles.includes(role);
    return this.selectedRole === role;

  }


  multipleRoles(): boolean {
    return this.user.roles.length > 1;
  }

  changeRole(role: string) {
    console.log(`Cambiando al rol: ${role}`);
    this.authService.setSelectedRole(role);
  }

  // cerrar sesion
  logout() {
    localStorage.clear();
    this.authService.setSelectedRole(null);
    this.router.navigate(['/login']);
  }

}

