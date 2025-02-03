import { Component, Input, OnInit ,Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'card-list',
  standalone: false,
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input() roles: string[] = [];
  @Output() selcetrole = new EventEmitter<string>();
  constructor( private router: Router){}

  onRoleSelected(role: string): void {
    this.selcetrole.emit(role);
    // localStorage.setItem('rolSelected', role);
    // console.log('Rol seleccionado:', role);
    // this.router.navigate(['/home']);
  }
}
