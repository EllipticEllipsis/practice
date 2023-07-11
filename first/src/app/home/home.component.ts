import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import { QuestionsService, Question, Section } from '../questions.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, QuestionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  questionsService: QuestionsService = inject(QuestionsService);
  questionList: Question[] = [];
  filteredQuestionList: Question[] = [];
  topicsList: string[] = this.questionsService.getAllTopics();
  
  constructor() {
    this.questionsService.questionsEmitter.subscribe(questions => this.questionList = questions);
    this.filteredQuestionList = this.questionList;
    console.log(this.questionList);
  }
  
  filterResults(year: string, section: string, course: string) {
    this.filteredQuestionList = this.questionList;
    if (year) {
      this.filteredQuestionList =
        this.filteredQuestionList.filter(question => question?.year === Number(year))
    }
    if (section) {
      this.filteredQuestionList =
        this.filteredQuestionList.filter(question => question?.section === section as Section)
    }
    if (course) {
      this.filteredQuestionList =
        this.filteredQuestionList.filter(question => question?.course === course)
    }
  }

}
