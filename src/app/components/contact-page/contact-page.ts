import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  imports: [FormsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  name = '';
  email = '';
  message = '';

  submitForm() {
    if (!this.name || !this.email || !this.message) {
      alert('Please fill all fields');
      return;
    }

    alert('Message sent successfully');
    this.name = '';
    this.email = '';
    this.message = '';
  }

}
