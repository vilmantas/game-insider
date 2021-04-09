import { MessageBase } from './base/base.model';
import { MessageTypes } from './base/types.model';
import { RoleTypes } from '../../game/player.model';

export class GameStartMessage implements MessageBase {
    readonly type = MessageTypes.GameStart;

    constructor(public role: RoleTypes, public word: string) { }
}
