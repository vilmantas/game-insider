import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  @Input()
  emoji: string;

  @Input()
  tooltip: string;

  constructor() { }

  ngOnInit(): void {
  }

}
