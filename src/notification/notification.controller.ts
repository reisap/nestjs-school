import { Controller, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { OnEvent } from '@nestjs/event-emitter';
import { typePusher } from '@app/common';

@Controller()
export class NotificationController {
  protected readonly logger = new Logger(NotificationController.name);
  constructor(private readonly notificatonService: NotificationService) {}

  @OnEvent(typePusher.newPost)
  async sendEventEmitter(payload: object) {
    // console.log('ini log === ', payload);
    this.logger.log('new post with event emitter', JSON.stringify(payload));
  }
}
