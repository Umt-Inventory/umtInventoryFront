import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  emri: any = localStorage.getItem('name');
  role: any = localStorage.getItem('role');

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }

  isHrRole(): boolean {
    return this.role === 'HR'; // Adjust the condition based on your role values
  }
}
