import { Component,OnInit  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'selectRol-page',
  standalone: false,

  templateUrl: './selectRol-page.component.html',
  styleUrl: './selectRol-page.component.css'
})

export class SelectRolPageComponent implements OnInit {
  constructor(
    private titleService: Title,
    private router: Router
  ){}

  ngOnInit(): void {
    this.titleService.setTitle('Selección de Rol · INV');

    const rolesString = localStorage.getItem('roles');

    if (rolesString) {

      const roles = JSON.parse(rolesString);
      console.log(roles);

      if (roles.length <= 1) {
        this.router.navigate(['/login']);
      }
    }
  }
}
