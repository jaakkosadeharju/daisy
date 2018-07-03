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
  }

  ngOnInit() {
    this.loadQuizzes();
  }

  newQuiz(): void {
    this.quizzes.push({
      id: this.quizzes.length.toString(),
      title: "Quiz " + (this.quizzes.length+1)});
    this.quizService.saveQuizzes(this.quizzes);
  }

  deleteQuiz(event): void {
    if (confirm("Delete the quiz?")) {
      let quiz = this.quizzes.find(q => q.id == event.target.dataset.quizid);
      this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
      this.quizService.saveQuizzes(this.quizzes);
    }
  }

  loadQuizzes(): void {
    this.quizzes = this.quizService.getQuizzes();
  }

}
