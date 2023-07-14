import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { QuestionsService, Question } from '../questions.service';

@Component({
  selector: 'app-paper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent {
  questionsService: QuestionsService = inject(QuestionsService);
  route: ActivatedRoute = inject(ActivatedRoute);
  part;
  year: Number;
  paper: Number;
  questionsList: Question[] = []; // TODO: useful?
  sectionQuestionsList: { 'I': Question[], 'II': Question[] } = { 'I': [], 'II': [] };

  constructor() {
    this.part = Number(this.route.snapshot.params['part']);
    this.year = Number(this.route.snapshot.params['year']);
    this.paper = Number(this.route.snapshot.params['paper']);

    this.questionsService.questionsEmitter.pipe(first()).subscribe(
      questions => {
        console.log(Object.values(questions))
        this.questionsList = Object.values(questions).filter(question =>
          (question?.part === this.part)
          && (question?.year === this.year)
          && (question?.paper === this.paper)
        );
        this.sectionQuestionsList = {
          'I': this.questionsList.filter(question => (question?.section === 'I')).sort((p, q) => p.number - q.number),
          'II': this.questionsList.filter(question => (question?.section === 'II')).sort((p, q) => p.number - q.number),
        };
        // console.log(this.questionsList);
      });
    this.questionsService.getData();
  }
}
