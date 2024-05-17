import { Module } from '@nestjs/common';
import { SocketIOService } from './sockerio.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketIOService],
  exports: [SocketIOService],
})
export class SocketIOModule {}
