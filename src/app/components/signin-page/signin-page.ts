import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-page',
  imports: [RouterLink, FormsModule, HttpClientModule],
  templateUrl: './signin-page.html',
  styleUrl: './signin-page.css',
})
export class SigninPage {
  formData = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router) { }
  onSubmit() {
    if (!this.formData.email || !this.formData.password) {
      alert("Email and Password required");
      return
    }
    this.authService.login(this.formData).subscribe({
      next: (res) => {
        console.log("login")
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed');
      }
    });
  }
}
