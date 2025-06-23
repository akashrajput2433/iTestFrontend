import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  sendToken(): void {
    console.log('Reset token sent to:', this.email);

    // Navigate to Reset Password
    this.router.navigate(['/reset-password']);
  }
}
