import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private toast: ToastService
  ) {}

  onReset(form: any): void {
    if (form.valid && this.password === this.confirmPassword) {
      const payload = {
        token: this.token,
        newPassword: this.password
      };

      this.api.auth.resetPassword(payload).pipe(
        tap(() => {
          this.toast.show('Password reset successful!', 'Close');
          this.router.navigate(['/login']);
        }),
        catchError(err => {
          console.error('Password reset failed:', err);
          this.toast.show('Invalid or expired token. Please try again.', 'Close');
          return of(null);
        })
      ).subscribe();
    } else {
      this.toast.show('Please fix the errors before submitting.', 'Close');
    }
  }
}
