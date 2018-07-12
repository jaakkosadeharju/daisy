import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Question } from '../question';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './quiz-answer.component.html',
  styleUrls: ['./quiz-answer.component.scss']
})
export class QuizAnswerComponent implements OnInit {
  questionChangeConnection;
  question: Question;
  questionAnswered: boolean;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {
    const quizSessionId: string = this.route.snapshot.paramMap.get('quiz_session_id');
    if (quizSessionId === JSON.parse(sessionStorage.quizSessionId || null)) {
      this.question = JSON.parse(sessionStorage.currentQuestion || null);
      this.questionAnswered = JSON.parse(sessionStorage.questionAnswered || false);
    }
    else {
      sessionStorage.currentQuestion = JSON.stringify(quizSessionId);
    }
  }

  ngOnInit() {
    this.questionChangeConnection = this.quizService.getQuestionChange().subscribe(({question}) => {
      console.log(`change question to `, question);
      this.question = question;
      sessionStorage.currentQuestion = JSON.stringify(question);
      this.questionAnswered = false;
      sessionStorage.questionAnswered = JSON.stringify(this.questionAnswered);
    });

    const quizSessionId: string = this.route.snapshot.paramMap.get('quiz_session_id');
    this.quizService.emitJoinQuiz(quizSessionId);
  }

  ngOnDestroy() {
    this.quizService.disconnectCurrentSocket();
  }

  answerQuestion(e, optionId) {
    this.quizService.emitAnswerQuestion(optionId);
    this.questionAnswered = true;
    sessionStorage.questionAnswered = JSON.stringify(this.questionAnswered);
  }

}
