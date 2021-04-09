import { MessageTypes } from './types.model';

export interface MessageBase {
    id?: string;
    type: MessageTypes;
    source?: string;
    toPlayer?: string;
}
