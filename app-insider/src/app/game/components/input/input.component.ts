import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameModule } from '../../game.module';
import { ActivePlayerActions } from '../../state/actions/active-player.actions';
import { playerProposalStateSelector, PlayerProposalState } from '../../state/game.state';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  proposalText: string;

  state: PlayerProposalState;

  constructor(private store: Store<GameModule>) {
    this.store.select(playerProposalStateSelector).subscribe(x => this.state = x)
  }

  ngOnInit(): void {
  }

  submitClick() {
    this.store.dispatch(ActivePlayerActions.submitted({ proposal: this.proposalText }))
    this.proposalText = ''
  }

}
