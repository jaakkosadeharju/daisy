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
  connection;
  question: Question;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.connection = this.quizService.getQuestionChange().subscribe(message => {
      console.log("change question")
    })
  }

}
