import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Part = 'IA' | 'IB' | 'II' | undefined;
export type Section = 'I' | 'II' | undefined;

export class Question {
  id!: string;
  part: number;
  year: number;
  paper: number;
  section: Section
  number: number;
  examiner: string;
  course!: string;
  topics!: string[];

  constructor(arg: PackedQuestion) {
    this.id = arg.id;
    this.course = arg.course;
    this.topics = arg.topics;

    const split = this.id.split('_');
    this.part = Number(split[0]);
    this.year = Number(split[1]);
    this.paper = Number(split[2]);
    this.section = split[3] as Section;

    const ne = split[4].split('');
    this.examiner = ne.pop() as string;
    this.number = Number(ne.join(''));
  }
}

export type PackedQuestion = {
  id: string;
  course: string;
  topics: string[];
}

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
