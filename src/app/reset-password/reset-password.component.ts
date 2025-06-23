import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onReset(form: any): void {
    if (form.valid && this.password === this.confirmPassword) {
      console.log('Password reset successful!');
      this.router.navigate(['/login']);
    }
  }
}
