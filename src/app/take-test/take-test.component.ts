import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {
  quizId!: number;
  quizTitle = '';
  description = '';
  questions: any[] = [];
  answers: { [key: number]: string } = {};
  totalMarks: number = 0;
  scoreToPass: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.quizId) {
      this.toast.show('Invalid Quiz ID', 'Close');
      return;
    }

    this.api.user.getQuizById(this.quizId).pipe(
      tap(res => {
        if (!res.success) {
          this.toast.show(res.message || 'Failed to load quiz.', 'Close');
          this.router.navigate(['/quiz']);
        }
      }),
      map(res => {
        const quiz = res.data;
        this.quizTitle = quiz.title;
        this.description = quiz.description;
        this.totalMarks = quiz.totalMarks;
        this.scoreToPass = quiz.scoreToPass;
        this.questions = quiz.questions.map((q: any) => ({
          id: q.id,
          questionText: q.text,
          options: [
            { label: 'A', value: q.optionA },
            { label: 'B', value: q.optionB },
            { label: 'C', value: q.optionC },
            { label: 'D', value: q.optionD }
          ]
        }));
      }),
      catchError(err => {
        this.toast.show('Error loading quiz. Try again later.', 'Close');
        return of(null);
      })
    ).subscribe();
  }

  selectAnswer(questionId: number, answer: string): void {
    this.answers[questionId] = answer;
  }

  submitQuiz(): void {
    const submission = this.questions.map(q => ({
      questionId: q.id,
      selectedAnswer: this.answers[q.id] || null
    }));

    this.api.user.submitQuiz(this.quizId, { answers: submission }).pipe(
      tap(res => {
        if (res.success) {
          this.toast.show('Quiz submitted successfully', 'Close');
          this.router.navigate(['/result'], {
            state: { result: res.data }
          });
        } else {
          this.toast.show(res.message || 'Submission failed.', 'Close');
        }
      }),
      catchError(err => {
        console.error('Submission error:', err);
        this.toast.show('Error submitting quiz.', 'Close');
        return of(null);
      })
    ).subscribe();
  }
}
