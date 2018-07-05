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

  saveQuizzes(quizzes: Quiz[]): void {
    localStorage.quizzes = JSON.stringify(quizzes);
  }

  updateQuiz(quiz: Quiz): void {
    let quizzes = this.getQuizzes();
    quizzes.splice(quizzes.indexOf(quizzes.find(f => f.id === quiz.id)), 1, quiz);
    this.saveQuizzes(quizzes);
  }

  getQuiz(id): Quiz {
    return this.getQuizzes().find(f => f.id == id);
  }


  randomString(length = 16, chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
    let result = "";
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
