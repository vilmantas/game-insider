import { QuestionsState } from '../game.state'
import { createReducer, Action, on } from '@ngrx/store'
import { AnswerTypes } from 'src/app/shared/game/question.model';
import { ProposalActions } from '../actions/proposal.actions';
import { QuestionActions } from '../actions/questions.actions';

export const questionsInitialState: QuestionsState = {
    answeredQuestions: [],
    askedQuestion: {
        answer: AnswerTypes.Unanswered,
        question: '',
        source: '',
        timestamp: new Date(),
        votes: []
    }
}

const reducer = createReducer(questionsInitialState,
    on(ProposalActions.proposalAccepted, (state, action) => ({
        ...state,
        askedQuestion: {
            source: action.proposal.source,
            answer: AnswerTypes.Unanswered,
            question: action.proposal.text,
            timestamp: new Date(),
            votes: []
        }
    })),
    on(QuestionActions.voteAccept, (state, action) => {

        let question = state.askedQuestion;

        question.answer = action.vote;

        state.answeredQuestions.push(question)

        return ({
            ...state,
            answeredQuestions: [
                ...state.answeredQuestions
            ]
        })
    }));

export function questionsReducer(state: QuestionsState, action: Action): QuestionsState {
    return reducer(state, action);
}