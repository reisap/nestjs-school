import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      let token =
        request.cookies['Authentication'] || request.headers.authorization;
      if (token.includes('Bearer')) {
        token = token.split(' ');
        token = token[1];
      }
      const secret = this.configService.get('JWT_SECRET');
      const decoded = await this.jwtService.verify(token, secret);
      if (!decoded) {
        response.status(401).json({ error: 'Credentials invalid!' });
      }
      request.userId = decoded.userId;
      return decoded;
    } catch (e) {
      return false;
    }
  }
}
