import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import Config from '../../../libs/common/src/config/config.json';

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport: { ...Config.mail },
    // }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: { ...Config.mail },
        defaults: {
          from: '"My App" <MS_gNpaGK@trial-pxkjn41p2q04z781.mlsender.net>',
        },
      }),
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
