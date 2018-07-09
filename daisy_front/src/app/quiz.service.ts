import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Quiz } from './quiz';
import { QuizSession } from './quiz_session';

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


  randomString(length: number = 16, chars: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"): string {
    let result = "";
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  getQuizSessions(): QuizSession[] {
    return JSON.parse(localStorage.quizSessions || '[]');
  }

  getQuizSession(quizSessionId: string): QuizSession {
    return this.getQuizSessions().find(f => f.id === quizSessionId);
  }

  createQuizSession(quiz: Quiz): QuizSession {
    let quizSession: QuizSession = {
      id: this.randomString(),
      quizId: quiz.id,
      activeQuestion: null
    }

    this.saveQuizSession(quizSession);
    return quizSession;
  }


  saveQuizSession(quizSession: QuizSession): void {
    let sessions: QuizSession[] = this.getQuizSessions();
    let existingSession: QuizSession = sessions.find(f => f.id === quizSession.id);
    if (quizSession) {
      // update existing session
      sessions.splice(sessions.indexOf(existingSession), 1, quizSession);
      localStorage.quizSessions = JSON.stringify(sessions);
    }
    else {
      // add new session
      localStorage.quizSessions = JSON.stringify([...this.getQuizSessions(), quizSession]);
    }
  }

}
