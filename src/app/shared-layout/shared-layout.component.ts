import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shared-layout',
  templateUrl: './shared-layout.component.html',
  styleUrls: ['./shared-layout.component.css']
})
export class SharedLayoutComponent {
  pageTitle: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.setPageTitle(url);
      });
  }

  setPageTitle(url: string) {
    if (url.includes('/dashboard')) {
      this.pageTitle = 'Dashboard';
    } else if (url.includes('/quiz')) {
      this.pageTitle = 'Quiz';
    } else if (url.includes('/edit-profile')) {
      this.pageTitle = 'Edit Profile';
    } else {
      this.pageTitle = 'User Panel';
    }
  }
}