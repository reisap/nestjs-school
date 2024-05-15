import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
