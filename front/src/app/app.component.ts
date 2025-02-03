import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Rutas en las que NO se mostrará header/footer
      const hiddenRoutes = ['/login', '/selectRol'];
      this.showHeaderFooter = !hiddenRoutes.includes(this.router.url);
    });
  }
}
