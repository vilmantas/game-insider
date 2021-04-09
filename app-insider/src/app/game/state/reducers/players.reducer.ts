import { PlayersState } from '../game.state';
import { createReducer, Action } from '@ngrx/store';

export const playersInitialState: PlayersState = {
    players: []
}

const reducer = createReducer(playersInitialState);

export function playersReducer(state: PlayersState, action: Action): PlayersState {
    return reducer(state, action);
}