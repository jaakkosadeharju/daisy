import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InPlaceEditorComponent } from './in-place-editor/in-place-editor.component';
import { QuizSessionComponent } from './quiz-session/quiz-session.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    DashboardComponent,
    InPlaceEditorComponent,
    QuizSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [InPlaceEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
