import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  upcomingQuizzes: any[] = [];
  quizHistory: any[] = [];

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    const allQuizzes = this.quizService.getAllQuizzes();

    const today = new Date();

    this.upcomingQuizzes = allQuizzes
      .filter(quiz => new Date(quiz.dueDate) >= today)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);

    this.quizHistory = [
      { name: 'History of India', marks: 18, total: 20 },
      { name: 'Chemistry Fundamentals', marks: 15, total: 20 },
      { name: 'English Grammar', marks: 19, total: 20 },
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
