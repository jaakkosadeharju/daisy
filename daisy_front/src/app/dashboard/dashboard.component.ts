import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  quizzes: Quiz[];

  constructor(private quizService: QuizService) {
    this.loadQuizzes();
  }

  ngOnInit() {
  }

  loadQuizzes(): void {
    this.quizzes = this.quizService.getQuizzes();
  }

}
