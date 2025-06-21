import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
  
    if (form.valid) {
      console.log('Form Submitted!');
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Add your authentication logic here
    } else {
      console.warn('Form is invalid');
    }
  }
  onRegister() {
    console.log('Redirecting to register...');
    // Example 1: If using Angular routing:
    this.router.navigate(['/register']);
  }
}
