import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuizComponent} from './quiz/quiz.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'quiz/:id', component: QuizComponent}
];


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }