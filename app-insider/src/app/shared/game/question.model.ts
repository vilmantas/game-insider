import { Vote } from './vote.model';

export enum AnswerTypes {
    Yes,
    No,
    Invalid,
    Unanswered
}

export class Question {
    timestamp: Date;
    question: string;
    answer: AnswerTypes;
    votes: Vote[];
    source: string;
}
