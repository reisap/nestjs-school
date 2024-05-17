import { Logger } from 'nestjs-pino';
import { EmailService } from './email';
import { SmsService } from './sms/sms.service';
import { PusherService } from './pusher/pusher.service';
import { SocketIOService } from './socketIO/sockerio.service';

export class NotificationService {
  protected readonly logger: Logger;
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pusherService: PusherService,
    private readonly socketIOService: SocketIOService,
  ) {}

  async emailNotif() {
    //send email ke user
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
