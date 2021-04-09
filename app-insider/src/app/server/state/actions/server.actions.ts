import { createAction, props } from '@ngrx/store';
import { MessageBase } from 'src/app/shared/communications/messages/base/base.model';

export enum ServerActions {

    MESSAGE_RECEIVED = '[Server] Message received from a channel',
    MESSAGE_QUEUED = '[Server] Message queued for sending',
    MESSAGE_SENT = '[Server] Message sent to users',
}

export const serverMessageReceived = createAction(ServerActions.MESSAGE_RECEIVED, props<{ message: MessageBase }>());
export const serverMessageSent = createAction(ServerActions.MESSAGE_SENT, props<{ message: MessageBase }>())
export const serverMessageQueued = createAction(ServerActions.MESSAGE_QUEUED, props<{ message: MessageBase }>());

