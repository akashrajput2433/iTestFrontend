import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../api.service';
import { UserService } from '../userservice.service';

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
    private api: ApiService,
    private userService: UserService
  ) {}

  onCaptchaResolved(token: string) {
    this.captchaToken = token;
    this.captchaError = false;
    console.log('CAPTCHA Token:', token);
  }

  onSubmit(form: NgForm) {
    if (!this.captchaToken) {
      this.captchaError = true;
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
          if (res?.success && res?.data) {
            const user = res.data;
            this.userService.setUserInfo({
              id: user.id,
              email: user.email,
              fullName: user.fullName
            });
            this.router.navigate(['/dashboard']);
          } else {
            alert(res?.message || 'Login failed');
          }
        }),
        catchError((err) => {
          console.error('Login failed:', err);
          alert('An error occurred during login');
          return of(null);
        })
      ).subscribe();
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
