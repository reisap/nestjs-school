import { Module } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PusherService],
})
export class PusherModule {}
