import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailService } from './email';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationService, EmailService],
})
export class NotificationModule {}
