import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz } from './quiz';
import { QUIZZES } from './mock-quizzes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  private apiUrl = 'http://api.daisy:8081';

  constructor(
    private http: HttpClient) {
  }

  getQuizzes(): Observable<Quiz[]> {
    const url = 'quizzes';
    return this.http.get<Quiz[]>(`${this.apiUrl}/${url}`);
  }

  getQuiz(id): Observable<Quiz> {
    const url = 'quiz';
    return this.http.get<Quiz>(`${this.apiUrl}/${url}/${id}`);
  }

}
