import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {
  quizId: number | null = null;
  quizTitle: string = '';
  questions: any[] = [];
  userAnswers: string[] = [];
  score: number = 0;
  showResult: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.quizTitle = `Quiz #${this.quizId}`;
    if (this.quizId === 201) {
      this.questions = [ 
        {
        questionText: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 'Paris '
        }
        ];
    }   
    else if (this.quizId === 202) {
      this.questions = [ /* Java Programming quiz questions */ ];
    }   
    else {
      this.questions = []; // fallback
    }


    // this.questions = [
    //   {
        // questionText: 'What is the capital of France?',
        // options: ['London', 'Berlin', 'Paris', 'Madrid'],
        // correctAnswer: 'Paris'
    //   },
    //   {
    //     questionText: 'Which language runs in a web browser?',
    //     options: ['C++', 'Python', 'Java', 'JavaScript'],
    //     correctAnswer: 'JavaScript'
    //   },
    //   {
    //     questionText: 'What does CPU stand for?',
    //     options: ['Central Process Unit', 'Computer Personal Unit', 'Central Performance Unit', 'Central Processing Unit'],
    //     correctAnswer: 'Central Processing Unit'
    //   },
    //   {
    //     questionText: 'What is the square root of 64?',
    //     options: ['6', '7', '8', '9'],
    //     correctAnswer: '8'
    //   }
    // ];

    this.userAnswers = new Array(this.questions.length).fill('');
  }

  submitQuiz() {
    this.score = 0;
    this.questions.forEach((q, index) => {
      if (this.userAnswers[index] === q.correctAnswer) {
        this.score++;
      }
    });
    this.showResult = true;
  }
}
