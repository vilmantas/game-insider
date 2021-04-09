import { Component } from '@angular/core';
import { ClientEngine } from '../shared/game/client-engine.model';
import { ClientState, connectionAvailableSelector, clientStateSelector, playersSelector, engineStatusSelector, connectionEstablishedSelector, gameStartedSelector } from './state/client.state';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-client',
    templateUrl: 'client.component.html',
    styleUrls: ['client.component.scss'],
})
export class ClientComponent {

    engine: ClientEngine;
    room: string;

    started: boolean;

    constructor(private store: Store<ClientState>) {
        if (window.location.hash !== '') {
            this.room = window.location.hash.substring(1);
        }

        this.store.select(connectionAvailableSelector).pipe(
            withLatestFrom(this.store.select(clientStateSelector)),
            map(([connStat, state]) => ({ connectionState: connStat, state: state }))
        ).subscribe(x => {
            if (x.connectionState && this.engine === undefined) {
                this.engine = new ClientEngine(x.state.username, x.state.room, this.store)
            }
        })

        this.store.select(gameStartedSelector).subscribe(x => this.started = x);
    }

}
