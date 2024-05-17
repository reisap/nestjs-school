import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './database/redis.service';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        ttl: configService.get<number>('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore, //need install with redis 3.X.X
    //   host: 'redis-db',
    //   port: 7379,
    // }),
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
  providers: [CommonService, JwtService, RedisService],
  exports: [CommonService, JwtModule, CacheModule],
})
export class CommonModule {}
