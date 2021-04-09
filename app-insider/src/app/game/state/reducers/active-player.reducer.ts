import { ActivePlayerState } from '../game.state';
import { RoleTypes } from 'src/app/shared/game/player.model';
import { createReducer, Action, on } from '@ngrx/store';
import { ActivePlayerActions } from '../actions/active-player.actions';
import { Proposal } from 'src/app/shared/game/proposal.model';


export const activePlayerInitialState: ActivePlayerState = {
    proposalState: {
        error: '',
        loading: false,
        proposal: {
            proposal: {
                id: '',
                source: '',
                text: '',
                timestamp: new Date(),
                votes: []
            },
            error: '',
            isBeingVotedOn: false
        }
    },
    role: RoleTypes.Undefined,
    username: 'Destroyeris'
}

const reducer = createReducer(activePlayerInitialState,
    on(ActivePlayerActions.submitted, (state, action) => ({
        ...state,
        proposalState: {
            ...state.proposalState,
            error: '',
            loading: true,
            proposal: {
                error: '',
                isBeingVotedOn: false,
                proposal: new Proposal(action.proposal)
            }
        },
    })),
    on(ActivePlayerActions.accepted, state => ({
        ...state,
        proposalState: {
            ...state.proposalState,
            loading: false,
            error: ''
        }
    }))
)

export function activePlayerReducer(state: ActivePlayerState, action: Action) {
    return reducer(state, action);
}