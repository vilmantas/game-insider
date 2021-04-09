import { ServerState } from '../server.state';
import { createReducer, on, Action } from '@ngrx/store'
import { serverMessageReceived, serverMessageSent, serverMessageQueued } from '../actions/server.actions';
import { roomInitialState, roomReducer } from './room.reducer';
import { gameInitialState, gameReducer } from './game.reducer';
import { Player } from 'src/app/shared/game/player.model';
import { roomSetRoom, roomRoomOpening } from '../actions/room.actions';
import { gameConnected, gameLogin, gamePrepare, gameStart, gameDisconnected } from '../actions/game.actions';
import { playerSetUsername } from '../actions/player.actions';

export const serverInitialState: ServerState = {
    room: roomInitialState,
    game: gameInitialState,
    messages: [],
    messagesToSend: [],
    player: {}
}

const reducer = createReducer(serverInitialState,
    on(roomSetRoom, roomRoomOpening, (state, action) => ({ ...state, room: roomReducer(state.room, action) })),
    on(gameConnected, gameLogin, gameDisconnected, gamePrepare, gameStart, (state, action) => ({ ...state, game: gameReducer(state.game, action) })),
    on(serverMessageReceived, (state, action) => ({ ...state, messages: [...state.messages, action.message] })),
    on(serverMessageQueued, (state, action) => ({ ...state, messagesToSend: [...state.messagesToSend, action.message] })),
    on(serverMessageSent, (state, action) => ({ ...state, messagesToSend: [...state.messagesToSend.filter(x => x.id !== action.message.id)] })),
    on(playerSetUsername, (state, action) => {

        const currentPlayer = state.game.players.find(x => x.username === x.id);

        currentPlayer.username = action.username
        currentPlayer.id = action.username;

        return {
            ...state, game: {
                ...state.game,
                players: [
                    ...state.game.players.filter(x => x.id !== action.username),
                    currentPlayer
                ]
            }
        }
    })
)

export function serverStateReducer(state: ServerState, action: Action) {
    return reducer(state, action);
}