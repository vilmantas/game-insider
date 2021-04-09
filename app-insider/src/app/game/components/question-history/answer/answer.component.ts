import { Component, Input } from "@angular/core";
import { AnswerTypes } from 'src/app/shared/game/question.model';

@Component({
    selector: 'app-answer',
    templateUrl: 'answer.component.html',
    styleUrls: [ 'answer.component.scss' ]
})
export class AnswerComponent {

    @Input()
    answer: AnswerTypes;
}