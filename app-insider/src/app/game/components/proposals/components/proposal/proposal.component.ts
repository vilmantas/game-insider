import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Proposal, ProposalVoteTypes, ProposalVote } from 'src/app/shared/game/proposal.model';
import { ProposalState } from 'src/app/game/state/game.state';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  animations: [

  ]
})
export class ProposalComponent implements OnInit {

  VoteTypes = ProposalVoteTypes

  @Input()
  proposal: ProposalState;

  @Output()
  onVoteClicked = new EventEmitter<{ proposalId: string, vote: ProposalVoteTypes }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  voteClicked(type: ProposalVoteTypes): void {
    this.onVoteClicked.emit({ proposalId: this.proposal.proposal.id, vote: type })
  }

  get negativeVotes() {
    return this.proposal.proposal.votes.filter(x => x.type === ProposalVoteTypes.No).length;
  }

  get positiveVotes() {
    return this.proposal.proposal.votes.filter(x => x.type === ProposalVoteTypes.Yes).length;
  }

  get Votes() {
    return this.proposal.proposal.votes;
  }

  get userVote(): ProposalVote {
    return this.proposal.proposal.votes.find(x => x.source === 'Destroyeris');
  }




}
