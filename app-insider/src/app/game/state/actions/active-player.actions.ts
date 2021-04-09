import { createAction, props } from '@ngrx/store';
import { Proposal, ProposalVoteTypes, ProposalVote } from 'src/app/shared/game/proposal.model';

export enum ActivePlayerActionTypes {
    PROPOSAL_SUBMITTED = '[Game] Players submitted question proposal',
    PROPOSAL_ACCEPTED = '[Game] Players submitted question proposal accepted',
    PROPOSAL_REJECTED = '[Game] Players submitted question proposal rejected',
    PROPOSAL_VOTE_SUBMITTED = '[Game] Question proposal vote submitted',
    PROPOSAL_VOTE_ACCEPTED = '[Game] Question proposal vote accepted',
}

const proposalSubmittedAction = createAction(ActivePlayerActionTypes.PROPOSAL_SUBMITTED, props<{ proposal: string }>());
const proposalAccepted = createAction(ActivePlayerActionTypes.PROPOSAL_ACCEPTED);
const proposalRejected = createAction(ActivePlayerActionTypes.PROPOSAL_REJECTED, props<{ error: string }>());
const proposalVoteSubmitted = createAction(ActivePlayerActionTypes.PROPOSAL_VOTE_SUBMITTED, props<{ proposalId: string, vote: ProposalVoteTypes }>())

export const ActivePlayerActions = {
    submitted: proposalSubmittedAction,
    accepted: proposalAccepted,
    rejected: proposalRejected,
    voteSubmitted: proposalVoteSubmitted,
}