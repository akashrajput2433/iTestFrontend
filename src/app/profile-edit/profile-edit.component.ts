import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  profileData = {
    email: 'akash@gmail.com',
    name: '',
    mobile: '',
    country: '',
    gender: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Updated Profile:', this.profileData);
      alert('Profile updated successfully!');
    } else {
      console.warn('Form is invalid');
    }
  }
}
