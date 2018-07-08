import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz';
import { Question } from '../question';

@Component({
  selector: 'app-quiz-presentation',
  templateUrl: './quiz-presentation.component.html',
  styleUrls: ['./quiz-presentation.component.scss']
})
export class QuizPresentationComponent implements OnInit {

  activeQuestion: Question;
  quiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService) { }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quiz_id');
    const questionId = this.route.snapshot.paramMap.get('question_id');

    this.quiz = this.quizService.getQuiz(quizId);
    this.activeQuestion = this.quiz.questions.find(f => f.id === questionId);
  }

  nextQuestionId(): string {
    if (this.quiz.questions.length === 0) throw "The quiz contains no questions.";
    
    if (this.isLastQuestion()) {
      return null;
    }
    else if (!this.activeQuestion) {
      return this.quiz.questions[0].id
    }
    else {
      const currentIndex: number = this.quiz.questions.indexOf(this.activeQuestion);
      return this.quiz.questions[currentIndex + 1].id;
    }
  }

  nextQuestion() {
    this.activeQuestion = this.quiz.questions.find(f => f.id === this.nextQuestionId());
  }

  isLastQuestion(): boolean {
    return this.quiz.questions[this.quiz.questions.length - 1] === this.activeQuestion;
  }
}
