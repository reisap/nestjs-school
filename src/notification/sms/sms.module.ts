import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
