import { Component, Input, OnInit ,Output, EventEmitter} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'selectRol-page',
  standalone: false,

  templateUrl: './selectRol-page.component.html',
  styleUrl: './selectRol-page.component.css'
})

export class SelectRolPageComponent implements OnInit {
  roles: string[] = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.titleService.setTitle('Selección de Rol · INV');

    const rolesString = localStorage.getItem('roles');

    if (rolesString) {

      const roles = JSON.parse(rolesString);
      // console.log(roles);

      if (this.roles.length === 1) {
        this.authService.setSelectedRole(this.roles[0]);
        this.router.navigate(['/home']);
      }
      this.roles = roles;
    }
    const rolSelected = localStorage.getItem('rolSelected');
    if (rolSelected) {
      console.log('Rol previamente seleccionado:', rolSelected);
      this.router.navigate(['/home']);
    }
  }
  onRoleSelected(role: string): void {
    // console.log('Rol seleccionado en el padre:', role);
    localStorage.setItem('rolSelected', role);
    this.authService.setSelectedRole(role);
    this.router.navigate(['/home']);
  }

  back(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
