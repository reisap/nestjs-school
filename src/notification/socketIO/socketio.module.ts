import { Module } from '@nestjs/common';
import { SocketIOService } from './socketio.service';
import { SocketIOGateway } from './socketio.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketIOService, SocketIOGateway],
  exports: [SocketIOGateway, SocketIOService],
})
export class SocketIOModule {}
