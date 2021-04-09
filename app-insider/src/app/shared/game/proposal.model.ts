import { Vote } from './vote.model';

export enum ProposalVoteTypes {
    Yes,
    No
}

export class Proposal {
    id?: string;
    timestamp: Date;
    text: string;
    votes: ProposalVote[];
    source: string;

    constructor(proposal: string) {
        this.text = proposal,
        this.timestamp = new Date(),
        this.votes = [],
        this.source = ''
        this.id = '_' + Math.random().toString(36).substr(2, 9);
    }
}

export class ProposalVote {
    type: ProposalVoteTypes;
    source: string;
    timestamp: Date;
    
    constructor(type: ProposalVoteTypes) {
        this.type = type;
        this.source = 'Destroyeris',
        this.timestamp = new Date()
    }
}
