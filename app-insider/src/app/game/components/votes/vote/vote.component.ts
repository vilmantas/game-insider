import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {

  @Input()
  disabled: boolean;

  @Input()
  borderColor: string;

  @Input()
  isBorderHoverOnly: boolean;

  @Input()
  emoji: string;

  @Input()
  count: number;

  @Input()
  hideIfNoVotes: boolean;

  @Output()
  onVoteClicked = new EventEmitter();

  get shouldShow(): boolean {
    return this.hideIfNoVotes ? this.count > 0 : true;
  }

  constructor() { }

  voteClicked(): void {
    if (!this.disabled)
      this.onVoteClicked.emit();
  }

}
