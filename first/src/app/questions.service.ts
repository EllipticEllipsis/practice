import { Injectable } from '@angular/core';


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


import * as vm_data from '../assets/1/VM.data.json';
import * as ai_data from '../assets/1/AI.data.json';
import * as de_data from '../assets/1/DE.data.json';
import * as p_data from '../assets/1/P.data.json';
import * as vm_topics from '../assets/1/VM.topics.json';
import * as ai_topics from '../assets/1/AI.topics.json';
import * as de_topics from '../assets/1/DE.topics.json';
import * as p_topics from '../assets/1/P.topics.json';

const data: PackedQuestion[] = [
  ...vm_data['default'],
  ...ai_data['default'],
  ...de_data['default'],
  ...p_data['default']
];
const topics: string[] = [
  ...vm_topics['default'],
  ...ai_topics['default'],
  ...de_topics['default'],
  ...p_topics['default']
];

// import * as vm_data from '../assets/1/VM.data.json';
// import * as vm_topics from '../assets/1/VM.topics.json';
// const data: PackedQuestion[] = vm_data['default'];
// const topics: string[] = vm_topics['default'];

const files: string[] = [
  "VM",
  "AI",
  "DE",
  "P",
  "G",
  "VC",
  "NS",
  "DR",
]

// const data = [];

// '../../assets/1/' + f + '.data.json'




@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questions: Question[];
  // TODO: should topics be handled elsewhere?
  topics: string[];

  getAllQuestions(): Question[] {
    return this.questions;
  }
  getAllTopics(): string[] {
    return this.topics;
  }

  constructor() {
    this.questions = data.map((entry) => new Question(entry));
    this.topics = topics;
  }
}
