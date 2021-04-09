import { createAction, props } from '@ngrx/store';
import { AnswerTypes } from 'src/app/shared/game/question.model';

export enum QuestionsActions { 
    QUESTION_VOTE_SUBMIT = '[Game] Master question answer submitted',
    QUESTION_VOTE_ACCEPT = '[Game] Master question answer accepted'
}

const questionVoteSubmit = createAction(QuestionsActions.QUESTION_VOTE_SUBMIT, props<{ vote: AnswerTypes }>());
const questionVoteAccept = createAction(QuestionsActions.QUESTION_VOTE_ACCEPT, props<{ vote: AnswerTypes }>());

export const QuestionActions = {
    voteAccept: questionVoteAccept,
    voteSubmit: questionVoteSubmit
}