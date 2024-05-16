import {
  Body,
  Controller,
  Post,
  PreconditionFailedException,
  Res,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Response } from 'express';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ResponseDto from '@app/common/dto/response.dto';

@Controller('v1/auth')
export class AuthController {
  protected readonly logger: Logger;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  async login(
    @Body() loginUser: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.usersService.login(loginUser);
    //inactive user / user belum verifikasi email
    // if (result.inactive === true) {
    //   throw new PreconditionFailedException('Please verify your email !');
    // }

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = await this.jwtService.signAsync({
      userId: result.id,
    });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
    const sendResponse = new ResponseDto({
      data: result,
    }).response();
    sendResponse['token'] = token;
    return sendResponse;
  }
}
