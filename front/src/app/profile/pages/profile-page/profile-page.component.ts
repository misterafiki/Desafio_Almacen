import { Component } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-page',
  standalone: false,

  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  constructor(
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Perfil');
  }
  // user : UserData
}
