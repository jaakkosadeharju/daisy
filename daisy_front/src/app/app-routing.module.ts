import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuizComponent} from './quiz/quiz.component';
import { QuizPresentationComponent } from './quiz-presentation/quiz-presentation.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'quiz/presentation/:quiz_id/:question_id', component: QuizPresentationComponent},
  {path: 'quiz/presentation/:quiz_id', component: QuizPresentationComponent}
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
