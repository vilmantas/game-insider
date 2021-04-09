import { MessageBase } from './base/base.model';
import { MessageTypes } from './base/types.model';

export class PlayerListMessage implements MessageBase {
    readonly type = MessageTypes.PlayerList;

    constructor(public usernames: string[]) {}
}