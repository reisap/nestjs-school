import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketIOService {
  private readonly logger = new Logger(SocketIOService.name);

  constructor() {}
  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
  }

  async newPost(body: any) {
    this.logger.log('body servide = ', body);
  }
}
