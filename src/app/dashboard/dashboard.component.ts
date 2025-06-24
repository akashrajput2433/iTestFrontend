import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  upcomingQuizzes: any[] = [];
  quizHistory: any[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private toast: ToastService,
 
  ) {}

  ngOnInit(): void {

    this.api.quiz.getAll().pipe(
      map((res: any[]) => {
        const today = new Date();
        return res
          .filter(q => new Date(q.dueDate) >= today)
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
          .slice(0, 3);
      }),
      tap((quizzes) => {
        this.upcomingQuizzes = quizzes;
        this.toast.show('Upcoming quizzes loaded successfully.', 'Close');
      }),
      catchError(err => {
        const message = err?.error?.message || 'Failed to load quizzes.';
        this.toast.show(message, 'Close');
        return of([]);
      })
    ).subscribe();

    // You can also fetch this history from an API if needed
    this.quizHistory = [
      { name: 'History of India', marks: 18, total: 20 },
      { name: 'Chemistry Fundamentals', marks: 15, total: 20 },
      { name: 'English Grammar', marks: 19, total: 20 }
    ];
  }

  confirmAndNavigate(quizId: number): void {
    if (confirm('Are you sure you want to take this test?')) {
      this.router.navigate(['/take-test', quizId]);
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
