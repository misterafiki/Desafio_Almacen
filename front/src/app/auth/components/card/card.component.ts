import { Component, Input, OnInit ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() role: string = '';
  @Output() selectRole = new EventEmitter<string>();

  imageUrl: string = '';

  ngOnInit(): void {
    this.setImageForRole();
  }

  setImageForRole(): void {
    const roleImages: { [key: string]: string } = {
      Administrador: '/images/admin.png',
      Profesor: '/images/teacher.png',
      JefeDepartamento: '/images/departamentHead.png',
      Direccion: '/images/eq_directivo.png',
    };


    this.imageUrl = roleImages[this.role] || '/images/user_default.png';
  }

  onCardClick(): void {
    this.selectRole.emit(this.role); 
  }
}


