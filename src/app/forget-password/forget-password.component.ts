import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: ToastService
  ) {}

  sendToken(): void {
    if (!this.email) {
      this.toast.show('Please enter your registered email.', 'Close');
      return;
    }

    this.api.auth.forgotPassword(this.email).pipe(
      tap((res: any) => {
        this.toast.show('Reset token sent to your email.', 'Close');
        // Navigate to reset-password (token may be in email)
        this.router.navigate(['/reset-password']);
      }),
      catchError(err => {
        console.error('Error sending reset token:', err);
        this.toast.show('Failed to send reset token. Please try again.', 'Close');
        return of(null);
      })
    ).subscribe();
  }
}
