import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent, Question, PackedQuestion, Section } from '../question/question.component';
// import * as vm_data from '../../assets/1/VM.data.json';
// import * as ai_data from '../../assets/1/AI.data.json';
// import * as de_data from '../../assets/1/DE.data.json';
// import * as p_data from '../../assets/1/P.data.json';
// import * as vm_topics from '../../assets/1/VM.topics.json';
// import * as ai_topics from '../../assets/1/AI.topics.json';
// import * as de_topics from '../../assets/1/DE.topics.json';
// import * as p_topics from '../../assets/1/P.topics.json';

// const data: PackedQuestion[] = [...vm_data, ...ai_data, ...de_data, ...p_data];
// const topics: string[] = [...vm_topics, ...ai_topics, ...de_topics, ...p_topics];

import * as vm_data from '../../assets/1/VM.data.json';
import * as vm_topics from '../../assets/1/VM.topics.json';

const data: PackedQuestion[] = vm_data;
const topics: string[] = vm_topics;

console.log(data)
console.log(topics)

const ttopics = [
  "complex numbers",
  "complex powers",
  "complex logarithm",
  "principal value",
  "vectors",
  "Cauchy-Schwarz inequality",
  "vector equations",
  "geometry",
  "planes and spheres",
  "minimum distance",
  "matrices",
  "linear equations",
  "image, kernel, rank, nullity",
  "determinant and trace",
  "similarity and change of basis",
  "diagonalisation",
  "Cayley-Hamilton",
  "nilpotency",
  "eigenvalues and eigenvectors",
  "algebraic and geometric multiplicity",
  "orthogonal matrices, rotations and reflexions",
  "Hermitian and unitary matrices",
  "normal matrices",
  "singular value decomposition"
]
console.log(ttopics)

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, QuestionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  questionList: Question[] = data.map((entry) => new Question(entry));
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
