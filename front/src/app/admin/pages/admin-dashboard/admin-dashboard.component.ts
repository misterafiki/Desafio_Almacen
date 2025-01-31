import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,

  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Admin · INV');
  }
}
