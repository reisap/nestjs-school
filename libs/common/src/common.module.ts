import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CommonService, JwtService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
