import { ParamsEmail, ParamsPusher } from '@app/common';
import { Injectable } from '@nestjs/common';
import { EmailNotificationService } from './email-notification.service';
import { PusherNotificationService } from './pusher-notification.service';
import { SmsNotificationService } from './sms-notification.service';
import { SocketIONotificationService } from './socketio-notification.service';

@Injectable()
export class NotificationService {
  constructor(
    private emailNotificationService: EmailNotificationService,
    private smsNotificationService: SmsNotificationService,
    private pusherNotificationService: PusherNotificationService,
    private socketIONotificationService: SocketIONotificationService,
  ) {}

  async emailNotif(params: ParamsEmail) {
    await this.emailNotificationService.sendEmailNotification(params);
  }
  async smsNotif() {
    //send via sms ke user
    await this.smsNotificationService.sendSmsNotification();
  }
  async pusherNotif(params: ParamsPusher) {
    await this.pusherNotificationService.sendPusherNotification(params);
  }
  async socketIONotif(body: any) {
    await this.socketIONotificationService.sendSocketIONotification(body);
  }
}
