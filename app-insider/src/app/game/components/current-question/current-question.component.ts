import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/shared/game/question.model';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.component.html',
  styleUrls: ['./current-question.component.scss']
})
export class CurrentQuestionComponent implements OnInit {

  @Input()
  state: Question;

  @Input()
  displayAnswers = true;

  constructor() { }

  ngOnInit(): void {
  }

}
