import { createAction, props } from '@ngrx/store';

export enum RoomActions {
    SET_ROOM = '[Server] Room set',
    START_ROOM = '[Server] Room opening'
}

export const roomSetRoom = createAction(RoomActions.SET_ROOM, props<{ name: string }>());
export const roomRoomOpening = createAction(RoomActions.START_ROOM);