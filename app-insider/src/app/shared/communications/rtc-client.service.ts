import { EventEmitter } from '@angular/core';
import { MessageBase } from './messages/base/base.model';

const configuration: RTCConfiguration = {
  iceServers: [{
    urls: ['stun:stun.l.google.com:19302'],
  }]
};

const window_shim: any = window || {};

const CLIENT_ID = 'gM7pzmr1gUfXvbEM';

export class RTCClientService {

  public onConnectionSuccess = new EventEmitter();
  public onConnectionClosed = new EventEmitter();
  public onHostMessageReceived = new EventEmitter<MessageBase>();
  public onStatusChanged = new EventEmitter<string>();

  public status: string;
  public hostId: string;
  public clientId: string;

  peerConnection: RTCPeerConnection;
  datachannel: RTCDataChannel;

  room: any;
  drone: any;

  members = [];

  constructor(private roomName: string) {
    this.JoinRoom(roomName);
  }

  public SendMessage(message: MessageBase) {
    this.datachannel.send(JSON.stringify(message));
  }

  private JoinRoom(name: string): void {
    this.onStatusChanged.emit('Connecting to server.');
    this.drone = new window_shim.ScaleDrone(CLIENT_ID);
    this.roomName = 'observable-' + name;

    this.drone.on('open', error => {

      this.clientId = this.drone.clientId;
      this.onStatusChanged.emit('Joining room.');
      this.room = this.drone.subscribe(this.roomName);

      this.room.on('members', members => {
        this.members = members;
        this.PrepareForRTC();

      });
    });
  }

  private StartWebRTC() {

    this.peerConnection = new RTCPeerConnection(configuration);

    this.peerConnection.onicecandidate = event => {
      if (event.candidate) {
        this.SendSignalingMessage({ 'candidate': event.candidate });
      }
    };

    this.peerConnection.onnegotiationneeded = () => {
      this.peerConnection.createOffer().then(desc => this.localDescCreated(desc));
    };

    this.onStatusChanged.emit('Creating data channel to game host...');

    this.datachannel = this.peerConnection.createDataChannel('pipe-' + this.drone.clientId);
    this.SetupDataChannel();

    this.StartListentingToSignals();
  }

  private StartListentingToSignals() {
    this.room.on('data', (message, client) => {
      if (client.id !== this.hostId) {
        return;
      }
      if (message.sdp) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(() => {
          if (this.peerConnection.remoteDescription.type === 'offer') {
            this.peerConnection.createAnswer().then(desc => this.localDescCreated(desc));
          }
        }, error => console.error(error));
      } else if (message.candidate) {
        this.peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    });
  }

  private localDescCreated(desc: RTCSessionDescriptionInit) {
    this.peerConnection.setLocalDescription(desc).then(() => {
      this.SendSignalingMessage({ 'sdp': this.peerConnection.localDescription });
    });
  }

  private SetupDataChannel() {

    this.datachannel.onopen = _ => this.CheckDataChannelState();
    this.datachannel.onclose = _ => this.CheckDataChannelState();

    this.datachannel.onmessage = event => {
      this.onHostMessageReceived.emit(JSON.parse(event.data));
    };
  }

  private CheckDataChannelState() {

    if (this.datachannel?.readyState === 'closed') {
      this.onConnectionClosed.emit();
    }

    if (this.datachannel?.readyState === 'open') {
      this.drone.close();
      this.onStatusChanged.emit('Connected to host!');
      this.onConnectionSuccess.emit();
    }
  }

  private SendSignalingMessage(message) {
    this.drone.publish({
      room: this.roomName,
      message
    });
  }

  private PrepareForRTC() {

    this.status = "Checking if connection to host available";

    if (this.members.length === 1) {
      this.onStatusChanged.emit('Room empty and we\'re not the host. Closing connection.');
      this.drone.close();
      return;
    }

    if (this.members.length >= 3) {
      this.onStatusChanged.emit('Waiting for other clients to be handled...');

      this.room.on('member_leave', member => {

        this.members.splice(this.members.findIndex(x => x.id === member.id), 1);

        if (this.members.length === 2) {
          this.onStatusChanged.emit('Connection to host available.');

          this.IdentifyHost();

          this.StartWebRTC();
        }
      });

      return;
    }

    this.IdentifyHost();

    this.onStatusChanged.emit('Connection to host available.');

    this.StartWebRTC();
  }

  private IdentifyHost() {
    for (const member of this.members) {
      if (member.id !== this.drone.clientId) {
        this.hostId = member.id;
        break;
      }
    }
  }
}
