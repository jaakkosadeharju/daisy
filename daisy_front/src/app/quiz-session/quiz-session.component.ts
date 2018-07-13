import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz';
import { QuizSession } from '../quiz_session';

@Component({
  selector: 'app-quiz-session',
  templateUrl: './quiz-session.component.html',
  styleUrls: ['./quiz-session.component.scss']
})
export class QuizSessionComponent implements OnInit {
  connectedUserConnection;
  userDisconnectedConnection;
  answeredQuestionConnection;
  quizSession: QuizSession;
  quiz: Quiz;
  userCount: number;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService) {
    }

  ngOnInit() {
    console.log('quiz-session-on-init');
    this.userCount = 0;
    const quizId = this.route.snapshot.paramMap.get('quiz_id');
    const quizSessionId = this.route.snapshot.paramMap.get('session_id');

    this.quiz = this.quizService.getQuiz(quizId);
    this.quizSession = this.quizService.getQuizSession(quizSessionId);
    
    this.connectedUserConnection = this.quizService.getUserJoin().subscribe(data => {
      this.userCount = data['clients'].length;
    });
    
    this.userDisconnectedConnection = this.quizService.getUserDisconnect().subscribe(data => {
      this.userCount--;
    });

    this.answeredQuestionConnection = this.quizService.getAnswerQuestion().subscribe((data) => {
      console.log(`${data['socketId']} answered ${data['optionId']}`);
    })

    this.quizService.emitRegisterQuiz(quizSessionId, quizId);
  }

  ngOnChanges() {
    console.log('quiz-session-on-changes');
    const quizId = this.route.snapshot.paramMap.get('quiz_id');
    const quizSessionId = this.route.snapshot.paramMap.get('session_id');
    this.quizService.emitRegisterQuiz(quizSessionId, quizId);
  }
  
  ngOnDestroy() {
    this.connectedUserConnection.unsubscribe();
    this.userDisconnectedConnection.unsubscribe();
    this.quizService.disconnectCurrentSocket();
  }

  nextQuestionId(): string {
    if (this.quiz.questions.length === 0) throw "The quiz contains no questions.";

    if (this.isLastQuestion()) {
      return null;
    }
    else if (!this.quizSession.activeQuestion) {
      return this.quiz.questions[0].id
    }
    else {
      const currentIndex: number = this.quiz.questions.map(q => q.id).indexOf(this.quizSession.activeQuestion.id);
      return this.quiz.questions[currentIndex + 1].id;
    }
  }

  nextQuestion() {
    this.quizSession.activeQuestion = this.quiz.questions.find(f => f.id === this.nextQuestionId());
    this.quizService.saveQuizSession(this.quizSession);
    this.quizService.emitQuestionChange(this.quizSession, this.quizSession.activeQuestion);
  }

  isLastQuestion(): boolean {
    return this.quizSession.activeQuestion && this.quiz.questions[this.quiz.questions.length - 1].id === this.quizSession.activeQuestion.id;
  }

  joinUrl(): string {
    return window.location.protocol + '//' +
      window.location.hostname +
      (['80', '443'].indexOf(window.location.port) < 0 ? ':' + window.location.port : '') +
      '/join/' + this.quizSession.id;
  }
}
