import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false
})
export class SidebarComponent {

  constructor(  ) { }

  searchTag( tag: string ): void {

  }

}
