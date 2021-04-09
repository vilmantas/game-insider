import { Injectable } from "@angular/core";
import { ClientState } from '../client.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { clientPlayerListUpdated, clientMessageReceived } from '../actions/client.actions';
import { filter, mergeMap } from 'rxjs/operators';
import { MessageTypes } from 'src/app/shared/communications/messages/base/types.model';
import { PlayerListMessage } from 'src/app/shared/communications/messages/player-list.message.model';
import { GameStartMessage } from 'src/app/shared/communications/messages/game-start.message.model';
import { clientGameStart } from '../actions/game.actions';


@Injectable({
    providedIn: 'root'
})
export class ClientEffects {

    constructor(private store: Store<ClientState>, private actions$: Actions) {
    }

    playerMessageHandler$ =
        createEffect(() => 
            this.actions$.pipe(
                ofType(clientMessageReceived),
                filter(x => x.message.type === MessageTypes.PlayerList),
                mergeMap(x => {
                    const playersMessage = <PlayerListMessage>x.message;
                    return [ clientPlayerListUpdated({ players: playersMessage.usernames }) ]
                })
            )
        )

    gameStartedMessageHandler$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(clientMessageReceived),
                filter(x => x.message.type === MessageTypes.GameStart),
                mergeMap(x => {
                    const startMessage = <GameStartMessage>x.message;
                    return [ clientGameStart({ role: startMessage.role, word: startMessage.word }) ]
                })
            ))
}