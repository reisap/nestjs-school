import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailModule } from './email';
import { SmsModule } from './sms/sms.module';
import { PusherModule } from './pusher/pusher.module';

@Module({
  imports: [EmailModule, SmsModule, PusherModule],
  controllers: [],
  providers: [NotificationService],
})
export class NotificationModule {}
