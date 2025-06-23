import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';

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

  constructor(
    private router: Router,
    private toastService: ToastService,
    private api: ApiService
) {}

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
      this.toastService.show('Please complete the CAPTCHA before logging in.', 'Close');
      console.warn('CAPTCHA not completed');
      return;
    }

    if (form.valid) {
      const payload = {
        email: this.email,
        password: this.password
      };

      this.api.auth.login(payload).pipe(
        tap((res: any) => {
          console.log('Login success:', res);
          localStorage.setItem('authToken', 'logged-in');
          this.toastService.show('Login successful!', 'Close');
          this.router.navigate(['/dashboard']);
        }),
        catchError((err) => {
          console.error('Login failed:', err);
          this.toastService.show('Login failed. Please check your credentials.', 'Close');
          return of(null);
        })
      ).subscribe();
    } else {
      this.toastService.show('Please fill all required fields correctly.', 'Close');
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}