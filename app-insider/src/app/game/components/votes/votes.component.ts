import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Vote, QuestionVoteTypes } from 'src/app/shared/game/vote.model';

@Component({
    selector: 'app-votes',
    templateUrl: 'votes.component.html',
    styleUrls: ['votes.component.scss']
})
export class VotesComponent {

    @Input()
    votes: Vote[]

    @Output()
    onVoteClick = new EventEmitter<QuestionVoteTypes>();

    constructor() { }

    get getGoodCount() {
        return this.getCount(QuestionVoteTypes.Good);
    }

    get getBadCount() {
        return this.getCount(QuestionVoteTypes.Bad);
    }

    get getSuspiciousCount() {
        return this.getCount(QuestionVoteTypes.Suspicious);
    }

    suspiciousClick() {
        this.onVoteClick.emit(QuestionVoteTypes.Suspicious)
    }

    goodClick() {
        this.onVoteClick.emit(QuestionVoteTypes.Good)
    }
    
    badClick() {
        this.onVoteClick.emit(QuestionVoteTypes.Bad)
    }

    private getCount(type: QuestionVoteTypes): number {
        return this.votes?.filter(x => x.type === type).length
    }

}