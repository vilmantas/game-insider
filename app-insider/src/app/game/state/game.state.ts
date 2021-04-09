import { RoleTypes } from 'src/app/shared/game/player.model';
import { Question } from 'src/app/shared/game/question.model';
import { Proposal } from 'src/app/shared/game/proposal.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const GameStateName = 'game'

export interface GameState {
    activePlayerState: ActivePlayerState
    playersState: PlayersState;
    questionsState: QuestionsState;
    proposalsState: ProposalsState;
    settingsState: GameSettingsState;
}

export interface ActivePlayerState {
    proposalState: PlayerProposalState,
    username: string;
    role: RoleTypes
}

export interface PlayerProposalState {
    proposal: ProposalState,
    loading: boolean,
    error: string
}

export interface ProposalsState {
    proposedQuestions: ProposalState[];
}

export interface ProposalState {
    proposal: Proposal,
    isBeingVotedOn: boolean,
    error: string
}

export interface QuestionsState {
    answeredQuestions: Question[];
    askedQuestion: Question;
}

export interface PlayersState {
    players: PlayerState[];
}

export interface PlayerState {
    username: string;
    role: RoleTypes;
}

export interface GameSettingsState {
    TimeToDecide: number;
    MaxQuestions: number;
    MaxPlayers: number;
    MinPlayers: number;
}

export const gameStateSelector = createFeatureSelector<GameState>(GameStateName);

export const playersStateSelector = createSelector(gameStateSelector, state => state.playersState);

export const currentPlayerSelector = createSelector(gameStateSelector, state => state.activePlayerState);

export const connectedPlayersSelector = createSelector(playersStateSelector, state => state.players);

export const proposalsStateSelector = createSelector(gameStateSelector, state => state.proposalsState);

export const questionsStateSelector = createSelector(gameStateSelector, state => state.questionsState);

export const playerProposalStateSelector = createSelector(currentPlayerSelector, state => state.proposalState);