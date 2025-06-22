import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor() {}

  getAllQuizzes() {
    return [
      { id: 101, name: 'Algebra Basics', dueDate: '2025-07-01' },
      { id: 102, name: 'History of India', dueDate: '2025-07-02' },
      { id: 103, name: 'Java Programming', dueDate: '2025-07-03' },
      { id: 104, name: 'Chemistry Fundamentals', dueDate: '2025-07-04' },
      { id: 105, name: 'World Geography', dueDate: '2025-07-05' },
    ];
  }
}
