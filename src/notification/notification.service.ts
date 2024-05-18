import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { PusherService } from './pusher/pusher.service';
import { SocketIOService } from './socketIO/socketio.service';
import { ParamsEmail, ParamsPusher, typeEmail, typePusher } from '@app/common';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { SocketIOGateway } from './socketIO/socketio.gateway';
import { Socket } from 'socket.io';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  constructor(
    private emailService: EmailService,
    private smsService: SmsService,
    private pusherService: PusherService,
    private SocketIOGateway: SocketIOGateway,
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
          break;
      }
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
  async smsNotif() {
    //send via sms ke user
  }
  async pusherNotif(params: ParamsPusher) {
    //digunakan untuk send notif ke web or mobile
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
  async socketIONotif(body: any) {
    //socket io notif realtime data
    try {
      //only for post now, send notification from server into client one directional
      await this.SocketIOGateway.sendNotifPost(body);
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
