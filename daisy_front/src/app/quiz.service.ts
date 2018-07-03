import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz } from './quiz';
import { QUIZZES } from './mock-quizzes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuizService {

  getQuizzes(): Quiz[] {
    return JSON.parse(localStorage.quizzes || '[]');
  }

  saveQuizzes(quizzes): void {
    localStorage.quizzes = JSON.stringify(quizzes);
  }


  getQuiz(id): Quiz {
    return this.getQuizzes().find(f => f.id == id);
  }
}
