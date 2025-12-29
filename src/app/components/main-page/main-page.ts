import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  constructor(private authService: AuthService, private router: Router) { }
  getStarted() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  uploadResume() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/upload-resume']);
    } else {
      alert('Please login first');
      this.router.navigate(['/login']);
    }
  }
}
