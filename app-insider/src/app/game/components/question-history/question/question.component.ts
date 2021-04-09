import { Component, Input } from "@angular/core";
import { Question } from 'src/app/shared/game/question.model';

@Component({
    selector: 'app-question',
    templateUrl: 'question.component.html',
    styleUrls: [ 'question.component.scss' ]
})
export class QuestionComponent {

    @Input()
    question: Question

    constructor() {}
}