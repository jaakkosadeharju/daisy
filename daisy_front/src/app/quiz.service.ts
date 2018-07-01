import { Injectable } from '@angular/core';
import { Quiz } from './quiz';
import { QUIZZES } from './mock-quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  getQuizzes() {
    return QUIZZES;
  }

  getQuiz(id) {
    return QUIZZES.find(q => q.id === id);
  }

  constructor() { }
}
