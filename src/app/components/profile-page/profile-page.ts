import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {

  user: any = null;
  stats: any = null;
  loading = true;
  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef, private authService: AuthService) { }
  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.stats = res.stats;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
