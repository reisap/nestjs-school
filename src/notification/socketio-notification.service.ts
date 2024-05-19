import { Injectable, Logger, BadGatewayException } from '@nestjs/common';
import { SocketIOGateway } from './socketIO/socketio.gateway';

@Injectable()
export class SocketIONotificationService {
  private readonly logger = new Logger(SocketIONotificationService.name);

  constructor(private socketIOGateway: SocketIOGateway) {}

  async sendSocketIONotification(body: any) {
    try {
      await this.socketIOGateway.sendNotifPost(body);
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
