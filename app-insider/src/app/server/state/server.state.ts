import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { MessageBase } from 'src/app/shared/communications/messages/base/base.model';
import { Player } from 'src/app/shared/game/player.model';

export const ServerStateName = 'Server';

export interface ServerState {
    room: RoomState;
    game: GameState;
    messages: MessageBase[];
    messagesToSend: MessageBase[];
    player: PlayerState;
}

export interface PlayerState {

}

export interface RoomState {
    loading: boolean;
    name: string;
}

export interface GameState {
    players: Player[];
    word: string;
    settings: GameSettings;
    starting: boolean;
    started: boolean;
}

export interface GameSettings {
    TimeToDecide: number;
    MaxQuestions: number;
    MaxPlayers: number;
    MinPlayers: number;
}


export const serverStateSelector = createFeatureSelector<ServerState>(ServerStateName);

export const gameStateSelector = createSelector(serverStateSelector, state => state.game);

export const roomSelector = createSelector(serverStateSelector, state => state.room);

export const playersSelector = createSelector(gameStateSelector, state => state.players);

export const currentPlayerSelector = createSelector(playersSelector, players => players?.find(x => x.username === x.id));

export const connectedPlayersSelector = createSelector(playersSelector, players => players?.filter(x => x.username !== x.id));

export const isRoomReadySelector = createSelector(roomSelector, state => !state.loading && state.name !== '');

export const messagesToSendSelector = createSelector(serverStateSelector, state => state.messagesToSend.length > 0 ? state.messagesToSend[0] : undefined);

export const isGameStarting = createSelector(gameStateSelector, state => state.starting);

export const isGameStarted = createSelector(gameStateSelector, state => state.started);

export const playerNamesSelector = createSelector(playersSelector, state => state.map(x => x?.username))

export const isGameReady = createSelector(gameStateSelector, playerNamesSelector, (gameState, players) => players.length >= gameState.settings.MinPlayers);
