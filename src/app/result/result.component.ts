import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  result: any;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const navState = navigation?.extras?.state;

    
    this.result = navState?.['result'] || window.history.state?.result;

    if (!this.result) {
      this.router.navigate(['/dashboard']);
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
