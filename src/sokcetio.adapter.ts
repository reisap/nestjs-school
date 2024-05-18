import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
// import { createAdapter } from '@socket.io/redis-adapter';

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);
  // private adapterConstructor: ReturnType<typeof createAdapter>;
  public serverSocketIO: any;
  constructor(
    private app: INestApplicationContext,
    private readonly configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    // const clientPort = parseInt(this.configService.get('CLIENT_PORT'));

    const optionsWithCORS: ServerOptions = {
      ...options,
    };

    const server: Server = super.createIOServer(port, optionsWithCORS);
    this.serverSocketIO = server;

    return server;
  }
}
