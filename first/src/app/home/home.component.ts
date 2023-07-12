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
  filtered: boolean = false;
  topicsList: string[] = this.questionsService.getAllTopics();

  constructor() {
    console.log("HOME constructor")
    this.questionsService.questionsEmitter.subscribe(
      questions => {
        console.log("QUESTIONS emitted")
        this.questionList = questions;
        // Only update when no filter applied
        if (!this.filtered) {
          this.filteredQuestionList = this.questionList;
        }
      });
    console.log(this.questionList);
  }

  // TODO: topic filters
  filterResults(year: string, section: string, course: string) {
    this.filteredQuestionList = this.questionList;
    this.filtered = false;
    if (year) {
      this.filteredQuestionList =
        this.filteredQuestionList.filter(question => question?.year === Number(year));
      this.filtered = true;
    }
    if (section) {
      this.filteredQuestionList =
        this.filteredQuestionList.filter(question => question?.section === section as Section)
      this.filtered = true;
    }
    if (course) {
      this.filteredQuestionList =
        this.filteredQuestionList.filter(question => question?.course === course)
      this.filtered = true;
    }
  }

}
