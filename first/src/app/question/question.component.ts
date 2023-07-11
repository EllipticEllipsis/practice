import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../questions.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question!: Question;
}
