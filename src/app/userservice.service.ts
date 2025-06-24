import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: number | null = null;
  private email: string = '';
  private fullName: string = '';

  constructor() {}

  // Save user data
  setUserInfo(user: { id: number; email: string; fullName: string }): void {
    this.userId = user.id;
    this.email = user.email;
    this.fullName = user.fullName;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getEmail(): string {
    return this.email;
  }

  getFullName(): string {
    return this.fullName;
  }

  checkIfLoggedIn():boolean{
    if(this.userId!==null){
      return true;
    }
    return false;
  }

  // Optional - Clear on logout
  clearUserInfo(): void {
    this.userId = null;
    this.email = '';
    this.fullName = '';
  }
}
