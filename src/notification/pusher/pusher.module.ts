import { Module } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PusherService],
  exports: [PusherService],
})
export class PusherModule {}
