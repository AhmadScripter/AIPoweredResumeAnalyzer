import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, HttpClientModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.confirmPassword) {
      alert("All fields are required");
      return
    }
    if (this.formData.password != this.formData.confirmPassword) {
      alert("Password do not match");
      return
    }
    this.authService.register({
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password
    }).subscribe({
      next: () => {
        alert('Account created successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    })
  }
}
