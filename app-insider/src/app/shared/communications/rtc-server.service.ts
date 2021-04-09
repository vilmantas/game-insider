import { Injectable, EventEmitter } from '@angular/core';
import { PeerConnectionModel } from './peer-connection.model';
import { MessageBase } from './messages/base/base.model';

const configuration: RTCConfiguration = {
  iceServers: [{
    urls: ['stun:stun.l.google.com:19302'],
  }]
};

const windowShim: any = window || {};

const CLIENT_ID = 'gM7pzmr1gUfXvbEM';

@Injectable({
  providedIn: 'root'
})
export class RTCServerService {

  public onPlayerJoined = new EventEmitter<string>();
  public onPlayerDisconnected = new EventEmitter<string>();
  public onMessageReceived = new EventEmitter<string>();

  public onRoomNameSet = new EventEmitter<string>();
  public onRoomOpening = new EventEmitter();

  public hostId: string;

  public peerClients: PeerConnectionModel[] = [];

  peerConnection: RTCPeerConnection;
  room: any;
  drone: any;
  roomName: string;

  constructor() {

  }

  public StartRoom(): string {

    const name = Math.floor(Math.random() * 0xFFFFFF).toString(16).substring(1);

    this.onRoomOpening.emit();

    this.drone = new windowShim.ScaleDrone(CLIENT_ID);

    this.roomName = 'observable-' + name;

    this.drone.on('open', error => {

      this.hostId = this.drone.clientId;

      this.room = this.drone.subscribe(this.roomName);

      this.SetupRoom();
    });

    return name;
  }

  private StartWebRTC() {
    this.peerConnection = new RTCPeerConnection(configuration);

    this.StartListentingToSignals();
  }

  private StartListentingToSignals() {
    this.room.on('data', (message, client) => {
      if (client.id === this.drone.clientId) {
        return;
      }

      const peerClient = this.GetPeerClient(client.id);

      if (message.sdp) {
        peerClient.connection.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(() => {
          if (peerClient.connection.remoteDescription.type === 'offer') {
            peerClient.connection.createAnswer()
              .then(desc => this.localDescCreated(peerClient.connection, desc), error => console.error(error));
          }
        }, error => console.error(error));
      } else if (message.candidate) {
        peerClient.connection.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    });
  }

  private localDescCreated(connection: RTCPeerConnection, desc: RTCSessionDescriptionInit) {
    connection.setLocalDescription(desc).then(() => {
      this.SendSignalingMessage({ 'sdp': connection.localDescription });
    }, error => console.log('bybis' + error));
  }

  private SetupDataChannel(client: PeerConnectionModel) {

    const dataChannel = client.dataChannel;

    dataChannel.onopen = _ => this.CheckDataChannelState(dataChannel);
    dataChannel.onclose = _ => this.CheckDataChannelState(dataChannel);
    dataChannel.onmessage = event => {
      this.onMessageReceived.emit({ ...JSON.parse(event.data), source: client.clientId});
    };
  }

  private CheckDataChannelState(dataChannel: RTCDataChannel): any {
    if (dataChannel?.readyState === 'open') {
      for (const client of this.peerClients) {
        if (client.dataChannel.label === dataChannel.label) {
          this.onPlayerJoined.emit(client.clientId);
        }
      }
    }

    if (dataChannel?.readyState === 'closed') {
      console.log('closing');
      for (const client of this.peerClients) {
        if (client.dataChannel.label === dataChannel.label) {
          this.onPlayerDisconnected.emit(client.clientId);
        }
      }
    }
  }

  private SendSignalingMessage(message) {
    this.drone.publish({
      room: this.roomName,
      message
    });
  }

  private GetPeerClient(id: string): PeerConnectionModel {

    let client = this.peerClients.find(x => x.clientId === id);

    if (client === undefined) {
      client = { clientId: id, connection: new RTCPeerConnection(configuration), dataChannel: undefined };
      this.peerClients.push(client);
    }

    this.SetupClientConnection(client);

    return client;
  }

  private SetupClientConnection(client: PeerConnectionModel): void {

    const connection = client.connection;

    connection.onicecandidate = event => {
      if (event.candidate) {
        this.SendSignalingMessage({ 'candidate': event.candidate });
      }
    };

    connection.ondatachannel = event => {
      client.dataChannel = event.channel;
      this.SetupDataChannel(client);
    };
  }

  private SetupRoom() {

    this.room.on('open', error => {
      this.onRoomNameSet.emit(this.roomName.substring('observable-'.length));
    })

    this.room.on('members', members => {

      if (members.length !== 1) {
        console.log('Room already taken');
        return;
      }

      this.StartWebRTC();
    });
  }

  public RelayMessageToPlayers(message: MessageBase): void {
    this.peerClients.filter(x => x.clientId !== message.source).forEach(client => {
      this.SendMessage(client, message);
    });
  }

  public SendMessageToPlayers(message: MessageBase): void {
    for (const client of this.peerClients) {
      this.SendMessage(client, message);
    }
  }

  public SendMessage(client: PeerConnectionModel, message: MessageBase) {
    client.dataChannel.send(JSON.stringify(message));
  }

  public SendMessageToPlayer(message: MessageBase) {
    const client = this.peerClients.find(x => x.clientId === message.toPlayer);
    this.SendMessage(client, message);
  }
}
