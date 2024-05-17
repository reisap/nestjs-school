import { MailerService } from '@nestjs-modules/mailer';
import { emailTemplateVerification } from './template/email.verification.template';
import Config from '../../../libs/common/src/config/config.json';
import { Logger } from 'nestjs-pino';

export class EmailService {
  protected readonly logger: Logger;
  constructor(private mailerService: MailerService) {}
  async sendAccountActivation(
    email: string,
    token: string,
    urlActivation = 'http://localhost:3000',
  ) {
    urlActivation = urlActivation + '/api/v1/users/verify?token=' + token;
    const html = emailTemplateVerification(urlActivation);
    const info = await this.mailerService.sendMail({
      from: `"Social Media Kekinian <${Config.mail.auth.user}>"`,
      to: email,
      subject: 'Account Activation',
      html: html,
    });
    this.logger.log(info);
  }
}
