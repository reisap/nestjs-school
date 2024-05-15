import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    providers: [CommonService],
    exports: [CommonService],
    imports: [ConfigModule, DatabaseModule, LoggerModule],
})
export class CommonModule {}
