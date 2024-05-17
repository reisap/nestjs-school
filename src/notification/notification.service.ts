import { Logger } from 'nestjs-pino';
import { EmailService } from './email';
import { SmsService } from './sms/sms.service';
import { PusherService } from './pusher/pusher.service';
import { SocketIOService } from './socketIO/sockerio.service';
import { ParamsEmail, typeEmail } from '@app/common';

export class NotificationService {
  protected readonly logger: Logger;
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pusherService: PusherService,
    private readonly socketIOService: SocketIOService,
  ) {}

  async emailNotif(params: ParamsEmail) {
    //send email ke user
    switch (params.type) {
      case typeEmail.verification:
        await this.emailService.sendAccountActivation(
          params.email,
          params.token,
        );
        break;
      default:
        await this.emailService.sendAccountActivation(
          params.email,
          params.token,
        );
    }
  }
  async smsNotif() {
    //send via sms ke user
  }
  async pusherNotif() {
    //digunakan untuk send notif ke web or mobile
  }
  async socketIONotif() {
    //socket io notif realtime data
  }
}
