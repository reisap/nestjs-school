import { Injectable, Logger, BadGatewayException } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { ParamsEmail, typeEmail } from '@app/common';

@Injectable()
export class EmailNotificationService {
  private readonly logger = new Logger(EmailNotificationService.name);

  constructor(private emailService: EmailService) {}

  async sendEmailNotification(params: ParamsEmail) {
    try {
      let info;
      switch (params.type) {
        case typeEmail.verification:
          info = await this.emailService.sendAccountActivation(
            params.email,
            params.token,
          );
          break;
        default:
          info = await this.emailService.sendAccountActivation(
            params.email,
            params.token,
          );
          break;
      }
      this.logger.log('send email =  ', info);
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
