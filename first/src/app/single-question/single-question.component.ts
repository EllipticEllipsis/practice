import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Question, QuestionsService } from '../questions.service';

@Component({
  selector: 'app-single-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent {
  questionsService: QuestionsService = inject(QuestionsService);
  route: ActivatedRoute = inject(ActivatedRoute);
  questionId = '';
  question: Question | undefined;

  constructor() {
    this.questionId = this.route.snapshot.params['id'];
    this.questionsService.questionsEmitter.pipe(first()).subscribe(
      questions => {
        this.question = questions[this.questionId];
        // console.log(questions);
        console.log("subscription caught in SingleQuestionComponent")
        console.log(this.question);
      });
    this.questionsService.getData();

    console.log("end of SingleQuestionComponent ct")
    console.log(this.question);
  }
}
