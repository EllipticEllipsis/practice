import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin } from 'rxjs';

export interface ResultJson { }

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

// TODO: decide whether to pull these in with the service
import * as vm_topics from '../assets/1/VM.topics.json';
import * as ai_topics from '../assets/1/AI.topics.json';
import * as de_topics from '../assets/1/DE.topics.json';
import * as p_topics from '../assets/1/P.topics.json';

const topics: string[] = [
  ...vm_topics['default'],
  ...ai_topics['default'],
  ...de_topics['default'],
  ...p_topics['default']
];

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


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questions: Question[] = [];
  public questionsEmitter = new EventEmitter<Question[]>()
  // TODO: should topics be handled elsewhere?
  topics: string[];

  getAllQuestions(): Question[] {
    return this.questions;
  }
  getAllTopics(): string[] {
    return this.topics;
  }

  getData() {
    if (this.questions.length > 0) {
      console.log("emit from cache");
      this.questionsEmitter.emit(this.questions);
      return;
    }
    const arrayOfObservables = files.map(
      f => this.http.get('../../assets/1/' + f + '.data.json', { responseType: 'text' as 'json' })
    )
    forkJoin(arrayOfObservables).subscribe((arrayOfDataFiles) => {
      this.questions = [];
      arrayOfDataFiles.forEach((oneFileOfData) =>
        this.questions.push(
          ...JSON.parse(oneFileOfData as any)
            .map((entry) => new Question(entry))

        )
      );
      console.log("get and emit");
      this.questionsEmitter.emit(this.questions);
    });
  }

  constructor(private http: HttpClient) {
    console.log("QUESTIONS service ct")

    this.topics = topics;
  }
}
