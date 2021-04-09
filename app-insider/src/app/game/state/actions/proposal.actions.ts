import { createAction, props } from '@ngrx/store';
import { Proposal, ProposalVote, ProposalVoteTypes } from 'src/app/shared/game/proposal.model';

export enum ProposalActionTypes {
    PROPOSAL_UPDATE = '[Game] Updating question proposals',
    PROPOSAL_ADD = '[Game] Question proposal added',
    PROPOSAL_VOTE_ADDED = '[Game] Question proposal vote added',
    PROPOSAL_VOTE_REMOVED = '[Game] Question proposal vote removed',
    PROPOSAL_VOTE_CHANGED = '[Game] Question proposal vote changed',
    PROPOSAL_ACCEPTED = '[Game] Question proposal accepted'
}

const proposalUpdate = createAction(ProposalActionTypes.PROPOSAL_UPDATE, props<{ proposals: Proposal[] }>());
const proposalAdded = createAction(ProposalActionTypes.PROPOSAL_ADD, props<{ proposal: Proposal }>())
const proposalVoteAdded = createAction(ProposalActionTypes.PROPOSAL_VOTE_ADDED, props<{ proposalId: string, vote: ProposalVote }>())
const proposalVoteRemoved = createAction(ProposalActionTypes.PROPOSAL_VOTE_REMOVED, props<{ proposalId: string, username: string }>());
const proposalVoteChanged = createAction(ProposalActionTypes.PROPOSAL_VOTE_CHANGED, props<{ proposalId: string, options: { username: string, vote: ProposalVote }}>());
const proposalAccepted = createAction(ProposalActionTypes.PROPOSAL_ACCEPTED, props<{ proposal: Proposal }>());

export const ProposalActions = {
    proposalsUpdate: proposalUpdate,
    proposalAdd: proposalAdded,
    voteAdded: proposalVoteAdded,
    voteRemoved: proposalVoteRemoved,
    voteChanged: proposalVoteChanged,
    proposalAccepted
}