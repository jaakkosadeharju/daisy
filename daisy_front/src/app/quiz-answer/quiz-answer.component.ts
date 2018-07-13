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
  nickname: string;
  joined: boolean;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {
    const quizSessionId: string = this.route.snapshot.paramMap.get('quiz_session_id');
    if (quizSessionId === sessionStorage.quizSessionId) {
      this.question = JSON.parse(sessionStorage.currentQuestion || 'null');
      this.questionAnswered = JSON.parse(sessionStorage.questionAnswered || 'false');
      this.joined = JSON.parse(sessionStorage.joined || 'false');
      this.nickname = sessionStorage.nickname;
    }
    else {
      sessionStorage.currentQuestion = JSON.stringify(quizSessionId);
      sessionStorage.joined = JSON.stringify(false);
      sessionStorage.nickname = '';
    }
  }

  ngOnInit() {
    this.questionChangeConnection = this.quizService.getQuestionChange().subscribe((data) => {
      console.log(`change question to `, data['question']);
      this.question = data['question'];
      sessionStorage.currentQuestion = JSON.stringify(data['question']);
      this.questionAnswered = false;
      sessionStorage.questionAnswered = JSON.stringify(this.questionAnswered);
    });
  }

  ngOnDestroy() {
    this.quizService.disconnectCurrentSocket();
  }

  answerQuestion(e, optionId) {
    this.quizService.emitAnswerQuestion(optionId);
    this.questionAnswered = true;
    sessionStorage.questionAnswered = JSON.stringify(this.questionAnswered);
  }

  joinQuiz(e, nickname: string): void {
    const quizSessionId: string = this.route.snapshot.paramMap.get('quiz_session_id');
    this.quizService.emitJoinQuiz(quizSessionId, nickname);

    this.joined = true;
    sessionStorage.joined = JSON.stringify(this.joined);
    this.nickname = nickname;
    sessionStorage.nickname = nickname;
    sessionStorage.quizSessionId = quizSessionId;
  }

}
