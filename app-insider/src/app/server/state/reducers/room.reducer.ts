import { RoomState } from '../server.state';
import { createReducer, on, Action } from '@ngrx/store';
import { roomRoomOpening, roomSetRoom } from '../actions/room.actions';

export const roomInitialState: RoomState = {
    name: '',
    loading: false
}

const reducer = createReducer(roomInitialState, 
    on(roomRoomOpening, (state, _) => ({ ...state, loading: true })),
    on(roomSetRoom, (state, action) => ({ ...state, loading: false, name: action.name }))
    )

export function roomReducer(state: RoomState, action: Action) {
    return reducer(state, action);
}