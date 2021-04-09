import { Component } from '@angular/core';
import { GameEngine } from '../shared/game/game-engine.model';
import { Store } from '@ngrx/store';
import { ServerState, playerNamesSelector, RoomState, roomSelector, isRoomReadySelector, isGameReady, currentPlayerSelector, connectedPlayersSelector } from './state/server.state';
import { gamePrepare } from './state/actions/game.actions';
import { playerSetUsername } from './state/actions/player.actions';
import { Player } from '../shared/game/player.model';

@Component({
    selector: 'app-server',
    templateUrl: 'server.component.html',
    styleUrls: [ 'server.component.scss' ]
})
export class ServerComponent {

    gameEngine: GameEngine;

    players: string[];
    room: RoomState;

    isRoomReady: boolean;

    username: string;

    canStart = false;

    player: Player;

    constructor(private store: Store<ServerState>) {
        this.store.select(playerNamesSelector).subscribe(x => this.players = x);

        this.store.select(connectedPlayersSelector).subscribe(x => console.log(x));

        this.store.select(currentPlayerSelector).subscribe(x => console.log(x));

        this.store.select(roomSelector).subscribe(x => this.room = x);

        this.store.select(isRoomReadySelector).subscribe(x => this.isRoomReady = x);

        this.store.select(isGameReady).subscribe(x => this.canStart = x);

        this.store.select(currentPlayerSelector).subscribe(x => this.player = x);
    }

    set() {
        this.store.dispatch(playerSetUsername({ username: this.username }));
    }

    startLobby() {
        this.gameEngine = new GameEngine(this.store);
    }

    startGame() {
        this.store.dispatch(gamePrepare());
    }
}
