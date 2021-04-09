import { MessageBase } from 'src/app/shared/communications/messages/base/base.model';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { Question } from 'src/app/shared/game/question.model';
import { RoleTypes } from 'src/app/shared/game/player.model';

export const ClientStateName = 'Client'

export interface ClientState {
    username: string;
    room: string;
    engineStatus: string;
    connectionEstablished: boolean;
    messagesReceived: MessageBase[];
    messagesToSend: MessageBase[];
    game: GameState;
}

export interface GameState {
    started: boolean;
    role: RoleTypes;
    word: string;
    questions: Question[];
    players: string[];
}

export const clientStateSelector = createFeatureSelector<ClientState>(ClientStateName);

export const gameStateSelector = createSelector(clientStateSelector, state => state.game);

export const playersSelector = createSelector(gameStateSelector, state => state.players);

export const messagesToSendSelector = createSelector(clientStateSelector, state => state.messagesToSend);

export const engineStatusSelector = createSelector(clientStateSelector, state => state.engineStatus);

export const connectionEstablishedSelector = createSelector(clientStateSelector, state => state.connectionEstablished);

export const connectionAvailableSelector = createSelector(clientStateSelector, state => state.username !== '' && state.room !== '');

export const gameStartedSelector = createSelector(gameStateSelector, state => state.started);