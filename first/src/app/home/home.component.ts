import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { QuestionsService, Question, Section } from '../questions.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, QuestionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  questionsService: QuestionsService = inject(QuestionsService);
  // questionList: Question[] = [];
  questionList: Question[] = [];
  filteredQuestionList: Question[] = [];
  filtered: boolean = false;
  questionsObtained: boolean = false;
  topicsLists: { [key: string]: string[] } = this.questionsService.getAllTopics();

  constructor() {
    // console.log("HOME ct");
    this.questionsService.questionsEmitter.pipe(first()).subscribe(
      questions => {
        // console.log("QUESTIONS emitted, length " + questions.length)
        this.questionList = Object.values(questions);
        // Only update when no filter applied
        if (!this.filtered) {
          this.filteredQuestionList = this.questionList;
        }
        this.questionsObtained = true;
      });
    this.questionsService.getData();
    // console.log(this.questionList);
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
