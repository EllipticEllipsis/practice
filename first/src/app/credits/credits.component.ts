import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CreditsSection {
  category: string;
  people: string[];
}

const data: CreditsSection[] = [
  { category: 'App design', people: ['me'] },
  { category: 'Site design', people: ['would be nice'] },
  { category: 'Angular guru', people: ['DB'] },
  { category: 'Question contributions', people: ['JFW', 'MW']}
]

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent {
  creditsList = data;
  constructor() {
    console.log("CREDITS loaded")
  }
}
