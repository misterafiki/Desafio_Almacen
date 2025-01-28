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
    private titleService: Title){}

    ngOnInit(): void {
      this.titleService.setTitle('Selección de Rol · INV');
    }
}
