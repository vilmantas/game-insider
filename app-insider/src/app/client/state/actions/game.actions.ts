import { createAction, props } from '@ngrx/store';
import { RoleTypes } from 'src/app/shared/game/player.model';

export enum ClientGameActions {
    STARTED = '[Client Game] Game started',
}

export const clientGameStart = createAction(ClientGameActions.STARTED, props<{ role: RoleTypes, word: string }>());