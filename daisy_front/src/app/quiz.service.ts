import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Quiz } from './quiz';

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
