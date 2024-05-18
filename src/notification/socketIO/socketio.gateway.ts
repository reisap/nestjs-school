import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketIOService } from './socketio.service';
import { Logger } from '@nestjs/common';
import { typePusher } from '@app/common';

@WebSocketGateway()
export class SocketIOGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  // @WebSocketServer()
  // public server: Socket;

  @WebSocketServer() server: Socket;

  private readonly logger = new Logger(SocketIOGateway.name);

  constructor(private readonly socketService: SocketIOService) {}

  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }
  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }
  async handleDisconnect(socket: Socket) {
    this.logger.log(`Disconnected socket id: ${socket.id}`);
  }

  //client send into server, jadi client yang trigger event ini
  @SubscribeMessage(typePusher.newPost) //from client into server
  async newPost(@MessageBody() body: any) {
    this.logger.log('value body == ', body);
  }

  //notif to client
  async sendNotifPost(body: any) {
    const result = await this.server.emit(typePusher.newPost, body); //send into client/frontend notification
    this.logger.log('result send new post into client == ', result);
  }
}
