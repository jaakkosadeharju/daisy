import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Quiz } from './quiz';
import { QuizSession } from './quiz_session';
import { Question } from './question';


@Injectable({
  providedIn: 'root'
})

export class QuizService {
  private apiUrl: string = "http://localhost:8081/";
  private socket;

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


  emitQuestionChange(question: Question): void {
    this.socket.emit('change-question', question);
  }

  getUserConnection(): Observable<{}> {
    let observable = new Observable(observer => {
      this.socket = io(this.apiUrl);
      this.socket.on('user-joined', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    return observable;
  }

  getUserDisconnect(): Observable<{}> {
    let observable = new Observable(observer => {
      this.socket = io(this.apiUrl);
      this.socket.on('user-disconnected', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    return observable;
  }

  getQuestionChange(): Observable<{}> {
    let observable = new Observable(observer => {
      this.socket = io(this.apiUrl);
      this.socket.on('change-question', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    return observable;
  }
}
