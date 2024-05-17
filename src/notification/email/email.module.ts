import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import Config from '../../../libs/common/src/config/config.json';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: { ...Config.mail },
    }),
  ],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
