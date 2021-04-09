import { GameSettingsState } from '../game.state';
import { createReducer, Action } from '@ngrx/store';

export const settingsInitialState: GameSettingsState = {
    TimeToDecide: 5,
    MaxQuestions: 20,
    MaxPlayers: 7,
    MinPlayers: 5,
}

const reducer = createReducer(settingsInitialState)

export function settingsReducer(state: GameSettingsState, action: Action) {
    return reducer(state, action);
}