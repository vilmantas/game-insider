import { NgModule } from "@angular/core";
import { GameComponent } from './game.component';
import { ClientQuestionHistoryComponent } from './components/question-history/question-history.component';
import { QuestionComponent } from './components/question-history/question/question.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnswerComponent } from './components/question-history/answer/answer.component';
import { VotesComponent } from './components/votes/votes.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerComponent } from './components/player-list/components/player/player.component';
import { GameRoutingModule } from './game-routing.module';
import { ProposalsComponent } from './components/proposals/proposals.component';
import { ProposalComponent } from './components/proposals/components/proposal/proposal.component';
import { StatusComponent } from './components/status/status.component';
import { InputComponent } from './components/input/input.component';
import { VoteComponent } from './components/votes/vote/vote.component';
import { StoreModule } from '@ngrx/store';
import { GameStateName } from './state/game.state';
import { gameReducer } from './state/reducers/game.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ActivePlayerEffects } from './state/effects/active-player.effects';
import { CurrentQuestionComponent } from './components/current-question/current-question.component';
import { QuestionAnswerComponent } from './components/current-question/question-answer/question-answer.component';

@NgModule({
    declarations: [
        GameComponent,
        ClientQuestionHistoryComponent,
        QuestionComponent,
        AnswerComponent,
        VotesComponent,
        PlayerListComponent,
        PlayerComponent,
        ProposalsComponent,
        ProposalComponent,
        StatusComponent,
        InputComponent,
        VoteComponent,
        CurrentQuestionComponent,
        QuestionAnswerComponent
    ],
    exports: [GameComponent],
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        GameRoutingModule,
        StoreModule.forFeature(GameStateName, gameReducer),
        EffectsModule.forFeature([ ActivePlayerEffects ])
    ],
})
export class GameModule {

}