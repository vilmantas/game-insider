import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProposalState } from '../../state/game.state';
import { ProposalVoteTypes } from 'src/app/shared/game/proposal.model';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {

  @Input()
  proposals: ProposalState[];

  @Output()
  onProposalVoted = new EventEmitter<{ proposalId: string, vote: ProposalVoteTypes }>();

  constructor() { }

  ngOnInit(): void {
  }

  handleVoteEvent(event: { proposalId: string, vote: ProposalVoteTypes }): void {
    this.onProposalVoted.emit(event);
  }
}
