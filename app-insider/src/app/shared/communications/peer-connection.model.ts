
export class PeerConnectionModel {
    clientId: string;
    connection: RTCPeerConnection;
    dataChannel?: RTCDataChannel;
}
