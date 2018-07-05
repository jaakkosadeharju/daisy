import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Question } from "../question";
import { QuestionOption } from '../question_option';
import { QuizService } from "../quiz.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() questionUpdated: EventEmitter<any> = new EventEmitter();
  @Output() questionDeleted: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private quizService: QuizService) { }
  
  ngOnInit() {
  }

  updateQuestionText(e): void {
    this.question.questionText = e.target.value;
    this.questionUpdated.emit(this.question);
  }

  updateQuestionOptionText(e): void {
    let opt = this.question.options.find(f => f.id === e.target.parentElement.dataset.optionid);
    opt.text = e.target.value;
    this.questionUpdated.emit(this.question);
  }

  addQuestionOption(e) {
    this.question.options.push({
      id: this.quizService.randomString(),
      text: "Option "+this.question.options.length,
      value: this.quizService.randomString()
    });

    this.questionUpdated.emit(this.question);
  }

  deleteOption(e) {
    let optionIndex = this.question.options.indexOf(
      this.question.options.find(f => f.id === e.target.dataset.optionid));
    this.question.options.splice(optionIndex, 1);
    this.questionUpdated.emit(this.question);
  }

  deleteQuestion(e) {
    this.questionDeleted.emit(this.question);
  }
}
