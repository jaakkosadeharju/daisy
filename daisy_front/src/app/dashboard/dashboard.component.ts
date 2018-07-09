import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';
import { QuizSession } from '../quiz_session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  quizzes: Quiz[];

  constructor(
    private router: Router,
    private quizService: QuizService) {
  }

  ngOnInit() {
    this.loadQuizzes();
  }

  newQuiz(): void {
    this.quizzes.push({
      id: this.quizService.randomString(),
      title: "Quiz " + (this.quizzes.length + 1),
      questions: []
    }
    );
    this.saveQuizzes();
  }

  deleteQuiz(event, quiz): void {
    if (confirm("Delete the quiz?")) {
      let quiz = this.quizzes.find(q => q.id == event.target.dataset.quizid);
      this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
      this.saveQuizzes();
    }
  }

  saveQuizzes(): void {
    this.quizService.saveQuizzes(this.quizzes);
  }

  loadQuizzes(): void {
    this.quizzes = this.quizService.getQuizzes();
  }


  startNewSession(e, quiz: Quiz): void {
    let s: QuizSession = this.quizService.createQuizSession(quiz);
    this.router.navigate(['quiz/' + quiz.id + '/session/' + s.id]);
  }

}
