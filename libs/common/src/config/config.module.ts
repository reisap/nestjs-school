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
        MYSQL_USER: Joi.string().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
