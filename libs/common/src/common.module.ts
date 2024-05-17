import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    CacheModule.register(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
  ],
  providers: [CommonService, JwtService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
