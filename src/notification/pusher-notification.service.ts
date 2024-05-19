import { Injectable, Logger, BadGatewayException } from '@nestjs/common';
import { PusherService } from './pusher/pusher.service';
import { ParamsPusher, typePusher } from '@app/common';

@Injectable()
export class PusherNotificationService {
  private readonly logger = new Logger(PusherNotificationService.name);

  constructor(private pusherService: PusherService) {}

  async sendPusherNotification(params: ParamsPusher) {
    try {
      switch (params.type) {
        case typePusher.newPost:
          await this.pusherService.send(
            params.channel,
            params.event,
            params.message,
          );
          break;
        default:
          await this.pusherService.send(
            params.channel,
            params.event,
            params.message,
          );
          break;
      }
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
