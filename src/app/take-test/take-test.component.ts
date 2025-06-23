import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {
  quizId!: number;
  quizTitle = '';
  questions: any[] = [];
  answers: { [key: number]: string } = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.quizTitle = `Quiz #${this.quizId}`;
    this.loadDummyQuestions();
  }

  loadDummyQuestions(): void {
    this.questions = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      questionText: `Question ${i + 1} text?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A'
    }));
  }

  selectAnswer(questionId: number, answer: string): void {
    this.answers[questionId] = answer;
  }

  submitQuiz(): void {
    let correct = 0;
    let attempted = 0;

    this.questions.forEach(q => {
      const answer = this.answers[q.id];
      if (answer) {
        attempted++;
        if (answer === q.correctAnswer) correct++;
      }
    });

    const total = this.questions.length;
    const percentage = Math.round((correct / total) * 100);

    const resultData = {
      quizName: this.quizTitle,
      correctAnswers: correct,
      wrongAnswers: total - correct,
      attempted:attempted,
      percentage: percentage
    };

    const existingHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]') as {
      name: string;
      marks: number;
      total: number;
    }[];

    existingHistory.push({
      name: resultData.quizName,
      marks: resultData.correctAnswers,
      total: total
    });

    localStorage.setItem('quizHistory', JSON.stringify(existingHistory));

    this.router.navigate(['/result'], { state: { result: resultData } });
  }
}
