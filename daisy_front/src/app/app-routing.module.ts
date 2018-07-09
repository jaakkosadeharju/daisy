import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuizComponent} from './quiz/quiz.component';
import { QuizSessionComponent } from './quiz-session/quiz-session.component';
import { QuizAnswerComponent } from './quiz-answer/quiz-answer.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'quiz/:quiz_id/session/:session_id', component: QuizSessionComponent},
  {path: 'join/:quiz_session_id', component: QuizAnswerComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
