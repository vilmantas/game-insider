import { MessageBase } from './base/base.model';
import { MessageTypes } from './base/types.model';

export class LoginMessage implements MessageBase {
    readonly type = MessageTypes.Login;

    constructor(public username: string, public source?: string) {
    }
}
