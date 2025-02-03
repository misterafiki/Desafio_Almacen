import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-profile-img',
  standalone: false,

  templateUrl: './profile-img.component.html',
  styleUrl: './profile-img.component.css'
})
export class ProfileImgComponent {
  @Input()
  imgUrl?: string;

  defaultImg = "/images/user_default.png"
}
