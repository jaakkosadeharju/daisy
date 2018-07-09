import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuizComponent} from './quiz/quiz.component';
import { QuizPresentationComponent } from './quiz-presentation/quiz-presentation.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'quiz/:quiz_id/presentation/:question_id', component: QuizPresentationComponent},
  {path: 'quiz/:quiz_id/presentation', component: QuizPresentationComponent}
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
