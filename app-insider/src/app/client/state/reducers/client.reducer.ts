import { createReducer, on, Action } from "@ngrx/store";
import { ClientState } from '../client.state';
import { clientMessageQueued, clientMessageReceived, clientMessageSent, clientDataSet, clientEngineStatusSet, clientPlayerListUpdated, clientConnectionSet } from '../actions/client.actions';
import { clientGameStart } from '../actions/game.actions';
import { RoleTypes } from 'src/app/shared/game/player.model';

export const clientInitialState: ClientState = {
    messagesReceived: [],
    messagesToSend: [],
    username: '',
    room: '',
    engineStatus: '',
    connectionEstablished: false,
    game: {
        players: [],
        questions: [],
        started: false,
        role: RoleTypes.Undefined,
        word: '',
    }
}

const reducer = createReducer(clientInitialState,
    on(clientMessageQueued, (state, action) => ({ ...state, messagesToSend: [...state.messagesToSend, action.message] })),
    on(clientMessageReceived, (state, action) => ({ ...state, messagesReceived: [...state.messagesReceived, action.message] })),
    on(clientMessageSent, (state, action) => ({ ...state, messagesToSend: [...state.messagesToSend.filter(x => x.id !== action.message.id)] })),
    on(clientDataSet, (state, action) => ({ ...state, username: action.username, room: action.room })),
    on(clientEngineStatusSet, (state, action) => ({ ...state, engineStatus: action.status })),
    on(clientPlayerListUpdated, (state, action) => ({ ...state, game: { ...state.game, players: [...action.players] } })),
    on(clientConnectionSet, (state, _) => ({ ...state, connectionEstablished: true })),
    on(clientGameStart, (state, action) => ({ ...state, game: {
        ...state.game,
        started: true,
        role: action.role,
        word: action.word
    } }))
)

export function clientReducer(state: ClientState, action: Action) {
    return reducer(state, action);
}