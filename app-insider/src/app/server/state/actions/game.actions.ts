import { props, createAction } from '@ngrx/store';
import { Player } from 'src/app/shared/game/player.model';

export enum GameActions {
    GAME_PREPARE = '[Server] Preparing game',
    GAME_START = '[Server] Game starting',
    CONNECTED = '[Server] User connected',
    DISCONNECTED = '[Server] User disconnected',
    LOGIN = '[Server] User logged in'
}

export const gameConnected = createAction(GameActions.CONNECTED, props<{ clientId: string }>());
export const gameDisconnected = createAction(GameActions.DISCONNECTED, props<{ clientId: string }>());
export const gameLogin = createAction(GameActions.LOGIN, props<{ username: string, clientId: string }>());
export const gameStart = createAction(GameActions.GAME_START, props<{ players: Player[], word: string }>());
export const gamePrepare = createAction(GameActions.GAME_PREPARE);