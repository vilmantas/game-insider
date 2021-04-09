import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { GameState, proposalsStateSelector } from '../game.state';
import { Store } from '@ngrx/store';
import { ActivePlayerActions } from '../actions/active-player.actions';
import { mergeMap, delay, withLatestFrom, map } from 'rxjs/operators';
import { ProposalActions } from '../actions/proposal.actions';
import { Proposal, ProposalVote, ProposalVoteTypes } from 'src/app/shared/game/proposal.model';

@Injectable({ providedIn: 'root' })
export class ActivePlayerEffects {

    constructor(private actions$: Actions, private store: Store<GameState>) { }

    proposalSubmit$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(ActivePlayerActions.submitted),
                delay(100),
                mergeMap(x => {

                    this.store.dispatch(ProposalActions.proposalAdd({ proposal: new Proposal(x.proposal) }))

                    return [ActivePlayerActions.accepted()];
                })
            )
        )

    proposalVoteSubmitted$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(ActivePlayerActions.voteSubmitted),
                withLatestFrom(this.store.select(proposalsStateSelector)),
                delay(100),
                mergeMap(([x, y]) => {

                    if (x.vote === ProposalVoteTypes.Yes) {
                        return [ProposalActions.proposalAccepted({ proposal: y.proposedQuestions.find(z => z.proposal.id === x.proposalId).proposal })]
                    }

                    return [ ProposalActions.voteAdded({ vote: new ProposalVote(x.vote), proposalId: x.proposalId }) ]

                })
            ))
}