import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailModule } from './email';
import { SmsModule } from './sms/sms.module';
import { PusherModule } from './pusher/pusher.module';
import { SocketIOModule } from './socketIO/socketio.module';

@Module({
  imports: [EmailModule, SmsModule, PusherModule, SocketIOModule],
  controllers: [],
  providers: [NotificationService],
})
export class NotificationModule {}
