import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import Config from '../../../libs/common/src/config/config.json';

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport: { ...Config.mail },
    //   defaults: {
    //     from: `'Social Media Kekinian <${Config.mail.auth.user}>'`,
    //   },
    // }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: { ...Config.mail },
        defaults: {
          from: `'Social Media Kekinian <${Config.mail.auth.user}>'`,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
