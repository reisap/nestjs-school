import { Module } from '@nestjs/common';
import { SocketIOService } from './sockerio.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketIOService],
})
export class SocketIOModule {}
