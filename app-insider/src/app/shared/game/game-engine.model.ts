import { Player, RoleTypes } from './player.model';
import { RTCServerService } from '../communications/rtc-server.service';
import { MessageBase } from '../communications/messages/base/base.model';
import { MessageTypes } from '../communications/messages/base/types.model';
import { LoginMessage } from '../communications/messages/login.message.model';
import { PlayerListMessage } from '../communications/messages/player-list.message.model';
import { Store } from '@ngrx/store';
import { ServerState, messagesToSendSelector, playersSelector, gameStateSelector, isGameStarting } from 'src/app/server/state/server.state';
import { serverMessageReceived, serverMessageSent } from 'src/app/server/state/actions/server.actions';
import { gameConnected, gameDisconnected, gameStart } from 'src/app/server/state/actions/game.actions';
import { roomSetRoom, roomRoomOpening } from 'src/app/server/state/actions/room.actions';

export class GameEngine {

    clientManager: RTCServerService;

    private players: Player[] = [];

    constructor(private store: Store<ServerState>) {

        this.store.select(playersSelector).subscribe(players => this.players = players);

        this.store.select(isGameStarting).subscribe(starting => {
            if (starting) {
                this.PrepareRoles();
            }
        });

        this.clientManager = new RTCServerService();

        this.clientManager.onPlayerJoined.subscribe(clientId => store.dispatch(gameConnected({ clientId })))

        this.clientManager.onRoomNameSet.subscribe(name => store.dispatch(roomSetRoom({ name })));

        this.clientManager.onRoomOpening.subscribe(_ => store.dispatch(roomRoomOpening()))

        this.clientManager.onPlayerDisconnected.subscribe(clientId => store.dispatch(gameDisconnected({ clientId })))

        this.clientManager.onMessageReceived.subscribe(message => store.dispatch(serverMessageReceived({ message })))

        this.store.select(messagesToSendSelector).subscribe(message => {
            
            if (message === undefined) return;

            if (message.source !== undefined) {
                this.clientManager.RelayMessageToPlayers(message);
            } else if (message.toPlayer !== undefined) {
                this.clientManager.SendMessageToPlayer(message);
            } else {
                this.clientManager.SendMessageToPlayers(message);

            }

            this.store.dispatch(serverMessageSent({ message }))
        })

        this.clientManager.StartRoom();

    }

    private PrepareRoles(): void {

        const master = this.players[Math.floor(Math.random() * this.players.length)];

        const wihtoutMaster = this.players.filter(x => x.username !== master.username);

        const insider = wihtoutMaster[Math.floor(Math.random() * wihtoutMaster.length)];

        master.SetRole(RoleTypes.Master);

        insider.SetRole(RoleTypes.Insider);

        for (const player of wihtoutMaster.filter(x => x.username !== insider.username)) {
            player.SetRole(RoleTypes.Commoner);
        }

        const playersAndRoles = [];
        for (const player of this.players) {
            playersAndRoles.push({ player: player.username, role: player.role });
        }

        this.store.dispatch(gameStart({ players: [...this.players], word: 'allah' }))
    }
}
