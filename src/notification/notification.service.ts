import { EmailService } from './email/email.service';
// import { SmsService } from './sms/sms.service';
// import { PusherService } from './pusher/pusher.service';
// import { SocketIOService } from './socketIO/sockerio.service';
import { ParamsEmail, typeEmail } from '@app/common';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  constructor(
    private emailService: EmailService,
    // private smsService: SmsService,
    // private pusherService: PusherService,
    // private socketIOService: SocketIOService,
  ) {}

  async emailNotif(params: ParamsEmail) {
    try {
      //send email ke user berdasarkan type nya
      switch (params.type) {
        case typeEmail.verification:
          const info = await this.emailService.sendAccountActivation(
            params.email,
            params.token,
          );
          this.logger.log('send email =  ', info);

          break;
        default:
          await this.emailService.sendAccountActivation(
            params.email,
            params.token,
          );
      }
    } catch (e) {
      throw new BadGatewayException(e);
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
