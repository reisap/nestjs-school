import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailModule } from './email/email.module';
import { SmsModule } from './sms/sms.module';
import { PusherModule } from './pusher/pusher.module';
import { SocketIOModule } from './socketIO/socketio.module';
import { CommonModule } from '@app/common/common.module';
import { NotificationController } from './notification.controller';
import { EmailNotificationService } from './email-notification.service';
import { SmsNotificationService } from './sms-notification.service';
import { PusherNotificationService } from './pusher-notification.service';
import { SocketIONotificationService } from './socketio-notification.service';

@Module({
  imports: [EmailModule, PusherModule, SmsModule, SocketIOModule, CommonModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    EmailNotificationService,
    SmsNotificationService,
    PusherNotificationService,
    SocketIONotificationService,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
