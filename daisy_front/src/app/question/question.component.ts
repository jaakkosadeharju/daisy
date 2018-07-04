import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Question } from "../question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  
  constructor() { }
  
  ngOnInit() {
  }
  
  onDelete(e) {
    this.delete.emit(e);
  }
}
