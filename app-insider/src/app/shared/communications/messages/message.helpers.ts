import { MessageBase } from './base/base.model';

export function GenerateIdForMessage(message: MessageBase): void {
    message.id = '_' + Math.random().toString(36).substr(2, 9);
}