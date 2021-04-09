import { combineReducers, ActionReducer, Action } from '@ngrx/store';
import { GameState } from '../game.state';
import { playersReducer } from './players.reducer';
import { questionsReducer } from './questions.reducer';
import { proposalsReducer } from './proposals.reducer';
import { settingsReducer } from './settings.reducer';
import { activePlayerReducer } from './active-player.reducer';

const reducer: ActionReducer<GameState> = combineReducers({
    playersState: playersReducer,
    questionsState: questionsReducer,
    proposalsState: proposalsReducer,
    settingsState: settingsReducer,
    activePlayerState: activePlayerReducer
})

export function gameReducer(state: GameState, action: Action) {
    return reducer(state, action);
}