import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UserService } from '../userservice.service';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  scheduledAt: string;
}

export interface QuizResponse {
  success: boolean;
  data: Quiz[];
  message?: string;
}
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
 quizzes$!: Observable<Quiz[]>;

  constructor(
    private router: Router,
    private api: ApiService,
    private toast: ToastService,
    private userservice :UserService
  ) {}

  ngOnInit(): void {
   try {
    const userId = this.userservice.getUserId();
    if (!userId) {
      this.toast.show('No user id available');
      return;
    }
    this.quizzes$ = this.api.user.getAvailableQuizzes(userId).pipe(
      tap((res: QuizResponse) => {
        if (!res.success) {
          console.error('Error loading quizzes:', res.message);
        }
      }),
      map((res: QuizResponse) => (res.success ? res.data : [])),
      catchError((err) => {
        const errorMessage =
          err?.error?.message || 'Failed to load quizzes. Please try again later.';
        this.toast.show(errorMessage, 'Close');
        return of([]); 
      })
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    this.toast.show('Unexpected error occurred', 'Close');
    this.quizzes$ = of([]); 
  }
  }

  confirmAndNavigate(quizId: number): void {
      this.router.navigate(['/take-test', quizId]);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
