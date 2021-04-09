import { Player } from './player.model';

export enum QuestionVoteTypes {
    Good,
    Suspicious,
    Bad,
}

export class Vote {
    type: QuestionVoteTypes;
    timestamp: Date;
    source: Player;
}