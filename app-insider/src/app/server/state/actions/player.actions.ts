import { createAction, props } from '@ngrx/store';

export enum PlayerActions {
    SET_USERNAME = '[Player] Set username',
}

export const playerSetUsername = createAction(PlayerActions.SET_USERNAME, props<{ username: string }>())