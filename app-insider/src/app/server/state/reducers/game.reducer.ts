import { GameState } from '../server.state';
import { createReducer, on, Action } from '@ngrx/store';
import { Player } from 'src/app/shared/game/player.model';
import { gameConnected, gameLogin, gamePrepare, gameStart, gameDisconnected } from '../actions/game.actions';
import { playerSetUsername } from '../actions/player.actions';

export const gameInitialState: GameState = {
    players: [
        new Player('')
    ],
    word: '',
    settings: { 
        MaxPlayers: 7,
        MinPlayers: 2,
        MaxQuestions: 20,
        TimeToDecide: 5
    },
    starting: false,
    started: false,
}

const reducer = createReducer(gameInitialState,
    on(gameConnected, (state, action) => {
        return ({
            ...state,
            players: [
                ...state.players,
                new Player(action.clientId),
            ]
        })
    }),
    on(gameLogin, (state, action) => {
        const player = state.players.find(x => x.id === action.clientId);
        player.SetUsername(action.username);
        return ({
            ...state,
            players: [
                ...state.players.filter(x => x.id !== action.clientId),
                player
            ]

        });
    }),
    on(gamePrepare, state => ({ ...state, starting: true })),
    on(gameStart, (state, action) => ({ ...state, starting: false, started: true, players: [...action.players], word: action.word })),
    on(gameDisconnected, (state, action) => ({ ...state, players: [...state.players.filter(x => x.id !== action.clientId)] }))
)

export function gameReducer(state: GameState, action: Action) {
    return reducer(state, action);
}