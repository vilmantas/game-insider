import { Question } from './question.model';
import { QuestionVoteTypes } from './vote.model';

export enum RoleTypes {
    Undefined = 'Undefined',
    Master = 'Master',
    Insider = 'Insider',
    Commoner = 'Commoner'
}

export class Player {
    id: string;
    username: string;
    role: RoleTypes;
    askedQuestions: Question[];
    votes: QuestionVoteTypes[];

    constructor(id: string) {
        this.id = id;
        this.username = id;
        this.role = RoleTypes.Undefined;
        this.askedQuestions = [];
    }

    public SetUsername(username: string): void {
        this.username = username;
    }

    public SetRole(role: RoleTypes): void {
        this.role = role;
    }
}
