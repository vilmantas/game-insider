import { createAction, props } from '@ngrx/store';
import { MessageBase } from 'src/app/shared/communications/messages/base/base.model';

export enum ClientActions {
    MESSAGE_RECEIVED = '[Client] Message received',
    MESSAGE_QUEUED = '[Client] Message queued for sending',
    MESSAGE_SENT = '[Client] Message sent',
    PLAYERS_CHANGED = '[Client] Player list updated',
    CLIENT_DATA_SET = '[Client] Client data set',
    ENGINE_STATUS_SET = '[Client] Engine status change',
    CONNECTION_SET = '[Client] Connected to host'
}

export const clientMessageReceived = createAction(ClientActions.MESSAGE_RECEIVED, props<{ message: MessageBase }>());
export const clientMessageQueued = createAction(ClientActions.MESSAGE_QUEUED, props<{ message: MessageBase }>());
export const clientMessageSent = createAction(ClientActions.MESSAGE_SENT, props<{ message: MessageBase }>());
export const clientPlayerListUpdated = createAction(ClientActions.PLAYERS_CHANGED, props<{ players: string[] }>());
export const clientDataSet = createAction(ClientActions.CLIENT_DATA_SET, props<{ username: string, room: string }>());
export const clientEngineStatusSet = createAction(ClientActions.ENGINE_STATUS_SET, props<{ status: string }>());
export const clientConnectionSet = createAction(ClientActions.CONNECTION_SET);