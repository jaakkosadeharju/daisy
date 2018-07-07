import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private quizService: QuizService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = this.quizService.getQuiz(id);
  }

  updateTitle(event): void {
    this.quiz.title = event.target.value;
  }

  addQuestion() {
    let newQuestion: Question = {
      id: this.quizService.randomString(),
      questionText: "New Question",
      options: []
    };

    this.quiz.questions.push(newQuestion);
  }

  deleteOption(e, question, option): void {
    if (confirm("Do you really want to delete the option?")) {
      let optionIndex = question.options.indexOf(
        question.options.find(f => f.id === option.id));
      question.options.splice(optionIndex, 1);
    }
  }

  addQuestionOption(e, question) {
    question.options.push({
      id: this.quizService.randomString(),
      text: "Option " + question.options.length
    });
  }

  questionChanged(question): void {
    let questionIndex = this.quiz.questions.indexOf(this.quiz.questions.find(f => f.id === question.id));
    this.quiz.questions.splice(questionIndex, 1, question);
  }

  deleteQuestion(e, question) {
    if (confirm("Do you really want to delete the question?")) {
      this.quiz.questions.splice(this.quiz.questions.indexOf(question), 1);
    }
  }


  updateQuestionText(e): void {
    let question = this.quiz.questions.find(f => f.id === e.target.dataset.questionid);
    question.questionText = e.target.value;
  }

  updateQuestionOptionText(e): void {
    let question = this.quiz.questions.find(f => f.id === e.target.dataset.questionid);
    let opt = question.options.find(f => f.id === e.target.parentElement.dataset.optionid);
    opt.text = e.target.value;
  }

  saveQuiz(e): void {
    this.quizService.updateQuiz(this.quiz);
    this.router.navigate(['/dashboard']);
  }
}
