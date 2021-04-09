import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, filter, withLatestFrom, tap } from 'rxjs/operators';
import { serverMessageReceived, serverMessageQueued } from '../actions/server.actions';
import { MessageTypes } from 'src/app/shared/communications/messages/base/types.model';
import { ServerState, playerNamesSelector } from '../server.state';
import { Store } from '@ngrx/store';
import { LoginMessage } from 'src/app/shared/communications/messages/login.message.model';
import { PlayerListMessage } from 'src/app/shared/communications/messages/player-list.message.model';
import { MessageBase } from 'src/app/shared/communications/messages/base/base.model';
import { GameStartMessage } from 'src/app/shared/communications/messages/game-start.message.model';
import { gameConnected, gameLogin, gameDisconnected, gameStart } from '../actions/game.actions';

@Injectable({
    providedIn: 'root'
})
export class ServerEffects {
    constructor(private actions$: Actions, private store: Store<ServerState>) {

    }

    appendUser$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(serverMessageReceived),
                filter(x => x.message.type === MessageTypes.PlayerJoined),
                mergeMap(x => [gameConnected({ clientId: x.message.source })])
            )
        );

    loginUser$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(serverMessageReceived),
                filter(x => x.message.type === MessageTypes.Login),
                map(x => <LoginMessage>x.message),
                mergeMap(x => [gameLogin({ clientId: x.source, username: x.username })])
            )
        );


    signalLoginUsers$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(gameLogin),
                withLatestFrom(this.store.select(playerNamesSelector)),
                map(([_, y]) => y),
                tap(x => {
                    const message = new PlayerListMessage(x);
                    (<MessageBase>message).id = '_' + Math.random().toString(36).substr(2, 9);
                    this.store.dispatch(serverMessageQueued({ message: message }))
                })
            ), { dispatch: false })

    signalDisconnectUsers$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(gameDisconnected),
                withLatestFrom(this.store.select(playerNamesSelector)),
                map(([_, y]) => y),
                mergeMap(x => {
                    const message = new PlayerListMessage(x);
                    (<MessageBase>message).id = '_' + Math.random().toString(36).substr(2, 9);
                    return [serverMessageQueued({ message: message })]
                })
            ))

    signalGameStart$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(gameStart),
                tap(x => {
                    for (let player of x.players.filter(x => x.username !== x.id)) {

                        let message = new GameStartMessage(player.role, x.word);

                        (<MessageBase>message).toPlayer = player.id;
                        (<MessageBase>message).id = '-' + Math.random().toString(36).substr(2, 9);

                        this.store.dispatch(serverMessageQueued({ message }));
                    }
                })), { dispatch: false }
        )
}
