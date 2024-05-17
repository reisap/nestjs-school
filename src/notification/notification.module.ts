import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailModule } from './email/email.module';
// import { SmsModule } from './sms/sms.module';
// import { PusherModule } from './pusher/pusher.module';
// import { SocketIOModule } from './socketIO/socketio.module';

@Module({
  imports: [EmailModule],
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
