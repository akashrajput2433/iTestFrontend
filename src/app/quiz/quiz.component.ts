import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  allQuizzes: any[] = [];

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    // Get quizzes from service on component load
    this.allQuizzes = this.quizService.getAllQuizzes();
  }

  confirmAndNavigate(quizId: number): void {
    const confirmed = confirm('Are you sure you want to take this test?');
    if (confirmed) {
      this.router.navigate(['/take-test', quizId]);
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
