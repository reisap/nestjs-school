import { emailTemplateVerification } from './template/email.verification.template';
import Config from '../../../libs/common/src/config/config.json';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
// import { transporter } from './email.transporter';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private mailerService: MailerService) {}
  public async sendAccountActivation(
    email: string,
    token: string,
    urlActivation = 'http://localhost:3000',
  ) {
    try {
      urlActivation = urlActivation + '/api/v1/users/verify?token=' + token;
      const html = emailTemplateVerification(urlActivation);

      // const info = await transporter.sendMail({
      //   from: `'Social Media Kekinian <${Config.mail.auth.user}>'`,
      //   to: email,
      //   subject: 'Account Activation',
      //   html: html,
      // });
      const info = await this.mailerService.sendMail({
        from: `'Social Media Kekinian <${Config.mail.auth.user}>'`,
        to: email,
        subject: 'Account Activation',
        html: html,
      });
      this.logger.warn(info);
      return info;
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
