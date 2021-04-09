import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState, proposalsStateSelector, ProposalState, QuestionsState, questionsStateSelector } from './state/game.state';
import { ProposalVoteTypes } from '../shared/game/proposal.model';
import { ActivePlayerActions } from './state/actions/active-player.actions';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['game.component.scss']
})

export class GameComponent implements OnInit {

    expanded = true;

    proposals: ProposalState[] = [];

    questionsState: QuestionsState;

    handleProposalVote($event: { proposalId: string, vote: ProposalVoteTypes }): void {
        this.store.dispatch(ActivePlayerActions.voteSubmitted({ proposalId: $event.proposalId, vote: $event.vote }))
    }

    constructor(private store: Store<GameState>) {
        this.store.select(proposalsStateSelector).subscribe(x => this.proposals = x.proposedQuestions);
        this.store.select(questionsStateSelector).subscribe(x => this.questionsState = x);
    }

    ngOnInit() { }
}