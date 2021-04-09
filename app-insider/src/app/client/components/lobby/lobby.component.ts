import { Component, OnInit, Input } from '@angular/core';
import { ClientState, engineStatusSelector, connectionEstablishedSelector, playersSelector, connectionAvailableSelector, clientStateSelector } from '../../state/client.state';
import { Store } from '@ngrx/store';
import { clientDataSet } from '../../state/actions/client.actions';

@Component({
    selector: 'app-client-lobby',
    templateUrl: 'lobby.component.html',
    styleUrls: ['lobby.component.scss']
})

export class ClientLobbyComponent {

    @Input()
    room: string;
    username: string;
    status: string;
    connectionStatus: boolean;
    connectionToHostAvailable: boolean;
    players: string[];

    constructor(private store: Store<ClientState>) {
        this.store.select(engineStatusSelector).subscribe(status => this.status = status);

        this.store.select(connectionEstablishedSelector).subscribe(established => this.connectionToHostAvailable = established);

        this.store.select(playersSelector).subscribe(x => this.players = x);
    }

    setData() {
        this.store.dispatch(clientDataSet({ username: this.username, room: this.room }));
    }
}