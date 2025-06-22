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
  captchaToken: string | null = null;
  captchaError: boolean = false;

  constructor(private router: Router) {}

  // Captures token when CAPTCHA is solved
  onCaptchaResolved(token: string) {
    this.captchaToken = token;
    this.captchaError = false;
    console.log('CAPTCHA Token:', token);
  }

  // Called when login form is submitted
  onSubmit(form: NgForm) {
    if (!this.captchaToken) {
      this.captchaError = true;
      console.warn('CAPTCHA not completed');
      return;
    }

    if (form.valid) {
      console.log('Form Submitted!');
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      console.log('CAPTCHA Token:', this.captchaToken);

      localStorage.setItem('authToken', 'logged-in');
      this.router.navigate(['/dashboard']);
      
      // TODO: Add your real authentication logic here
      // Optionally send captchaToken to the backend for verification
    } else {
      console.warn('Form is invalid');
    }
  }

  // Called when "Register New User" link is clicked
  onRegister() {
    console.log('Redirecting to register...');
    this.router.navigate(['/register']);
  }
}
