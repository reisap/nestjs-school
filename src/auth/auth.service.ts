import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'nestjs-pino';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  protected readonly logger: Logger;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async user(request: Request) {
    const cookie = request.cookies['jwt'];

    const { userId } = await this.jwtService.verifyAsync(cookie);

    return this.userService.findOne(userId);
  }
}
