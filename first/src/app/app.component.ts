import { Component } from '@angular/core';
import { QuestionComponent, Question, PackedQuestion } from './question/question.component';
import { HomeComponent } from './home/home.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first';
}
