import { createReducer, on, Action } from "@ngrx/store";
import { ProposalActions } from '../actions/proposal.actions';
import { ProposalsState, ProposalState } from '../game.state';
import { ActivePlayerActions } from '../actions/active-player.actions';
import { ProposalVoteTypes } from 'src/app/shared/game/proposal.model';

export const proposalsInitialState: ProposalsState = {
    proposedQuestions: []
}

const reducer = createReducer(proposalsInitialState,
    on(ProposalActions.proposalsUpdate, (state, action) => ({
        ...state,
        proposedQuestions: [
            ...action.proposals.map<ProposalState>(x => ({ proposal: x, isBeingVotedOn: false, error: '' }))
        ]
    })),
    on(ProposalActions.proposalAdd, (state, action) => ({
        ...state,
        proposedQuestions: [
            ...state.proposedQuestions,
            { proposal: action.proposal, isBeingVotedOn: false, error: '' }
        ]
    })),
    on(ActivePlayerActions.voteSubmitted, (state, action) => {

        const proposalState = state.proposedQuestions.find(x => x.proposal.id === action.proposalId);
        proposalState.isBeingVotedOn = false;

        const result = ({
            ...state,
            proposedQuestions: [
                ...state.proposedQuestions,
            ]
        })

        return result;
    }),
    on(ProposalActions.voteAdded, (state, action) => {

        const proposalState = state.proposedQuestions.find(x => x.proposal.id === action.proposalId);

        proposalState.proposal.votes = [
            ...proposalState.proposal.votes.filter(x => x.source !== action.vote.source),
            action.vote
        ]
        proposalState.isBeingVotedOn = false;

        return ({
            ...state,
            proposedQuestions: [
                ...state.proposedQuestions
            ]
        })
    }),
    on(ProposalActions.voteRemoved, (state, action) => {

        const proposalState = state.proposedQuestions.find(x => x.proposal.id === action.proposalId);

        proposalState.proposal.votes = [
            ...proposalState.proposal.votes.filter(x => x.source !== action.username),
        ]
        proposalState.isBeingVotedOn = false

        return ({
            ...state,
            proposedQuestions: [
                ...state.proposedQuestions
            ]
        })
    }),

    on(ProposalActions.voteChanged, (state, action) => {

        const proposalState = state.proposedQuestions.find(x => x.proposal.id === action.proposalId);

        proposalState.proposal.votes = [
            ...proposalState.proposal.votes.filter(x => x.source !== action.options.vote.source),
            action.options.vote
        ]
        proposalState.isBeingVotedOn = false;

        return ({
            ...state,
            proposedQuestions: [
                ...state.proposedQuestions
            ]
        })
    }),
    on(ProposalActions.proposalAccepted, (state, action) => ({
        ...state,
        proposedQuestions: [
            ...state.proposedQuestions.filter(x => x.proposal.id !== action.proposal.id)
        ]
    }))
)

export function proposalsReducer(state: ProposalsState, action: Action): ProposalsState {
    return reducer(state, action);
}