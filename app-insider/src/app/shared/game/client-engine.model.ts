import { RTCClientService } from '../communications/rtc-client.service';
import { MessageBase } from '../communications/messages/base/base.model';
import { LoginMessage } from '../communications/messages/login.message.model';
import { MessageTypes } from '../communications/messages/base/types.model';
import { PlayerListMessage } from '../communications/messages/player-list.message.model';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientState, messagesToSendSelector } from 'src/app/client/state/client.state';
import { clientMessageReceived, clientMessageQueued, clientMessageSent, clientEngineStatusSet, clientConnectionSet } from 'src/app/client/state/actions/client.actions';
import { GenerateIdForMessage } from '../communications/messages/message.helpers';

export class ClientEngine {

    public onPlayersChanged = new EventEmitter<string[]>();

    isConnected = false;

    status: string;

    connectionClient: RTCClientService;

    players: string[];

    constructor(public username: string, room: string, private store: Store<ClientState>) {

        this.connectionClient = new RTCClientService(room);

        this.connectionClient.onStatusChanged.subscribe(x => this.store.dispatch(clientEngineStatusSet({ status: x })));

        this.connectionClient.onConnectionSuccess.subscribe(() => {
            this.prepareState();
        });

        this.store.select(messagesToSendSelector).subscribe(messages => {
            if (messages.length > 0) {
                const message = messages[0];
                this.connectionClient.SendMessage(message)
                this.store.dispatch(clientMessageSent({ message: message }))
            }
        })

    }

    private prepareState() {

        this.store.dispatch(clientConnectionSet());
    
        this.connectionClient.onHostMessageReceived.subscribe(message => this.store.dispatch(clientMessageReceived({ message: message })))

        const loginMessage = new LoginMessage(this.username);

        GenerateIdForMessage(loginMessage);

        this.store.dispatch(clientMessageQueued({ message: loginMessage}));
    }

    private handleCommand(message: MessageBase) {
        
        console.log(message);

        if (message.type === MessageTypes.PlayerList) {
            const list = <PlayerListMessage>message;

            this.setPlayers(list.usernames);
        }
    }

    private setPlayers(players: string[]) {
        this.players = [
            ...players
        ]
        this.onPlayersChanged.emit(this.players);
    }
}