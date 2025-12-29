import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-page.html',
  styleUrl: './navbar-page.css',
})
export class NavbarPage {

  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
