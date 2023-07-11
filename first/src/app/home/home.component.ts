import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import { QuestionsService, Question, PackedQuestion, Section } from '../questions.service';

import * as vm_topics from '../../assets/1/VM.topics.json'
const topics: string[] = vm_topics['default'];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, QuestionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  questionsService: QuestionsService = inject(QuestionsService);
  questionList: Question[] = this.questionsService.getAllQuestions();
  //  data.map((entry) => new Question(entry));
  filteredQuestionList: Question[] = [];
  topicsList: string[] = topics;

  constructor() {
    this.filteredQuestionList = this.questionList;
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
