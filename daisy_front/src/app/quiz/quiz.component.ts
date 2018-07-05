import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Quiz } from '../quiz';
import { Question } from "../question";
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = this.quizService.getQuiz(id);
  }

  updateTitle(event): void {
    this.quiz.title = event.target.value;
    this.quizService.updateQuiz(this.quiz);
  }

  addQuestion() {
    let newQuestion: Question = {
      id: this.quizService.randomString(),
      questionText: "New Question",
      options: []
    };

    this.quiz.questions.push(newQuestion);
    this.quizService.updateQuiz(this.quiz);
  }

  questionChanged(question): void {
    let questionIndex = this.quiz.questions.indexOf(this.quiz.questions.find(f => f.id === question.id));
    this.quiz.questions.splice(questionIndex, 1, question);
    this.quizService.updateQuiz(this.quiz);
  }

  deleteQuestion(question) {
    this.quiz.questions.splice(this.quiz.questions.indexOf(question), 1);
  }
}
