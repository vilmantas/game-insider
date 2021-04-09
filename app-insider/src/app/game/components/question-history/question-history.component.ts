import { Component, Input } from "@angular/core";
 import { QuestionsState } from '../../state/game.state';

@Component({
    selector: 'app-client-question-history',
    templateUrl: 'question-history.component.html',
    styleUrls: [ 'question-history.component.scss' ]
})
export class ClientQuestionHistoryComponent {

    @Input()
    state: QuestionsState

    constructor() {}
}