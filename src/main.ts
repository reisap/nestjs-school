import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@app/common';
import compression from 'compression';
import { SocketIOAdapter } from './sokcetio.adapter';
// import csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
    }),
  );
  // app.use(csurf());
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter()); //digunakan ketika ada error execption yang terjadi,sehingga lebih mudah divalidasi dan di proses
  const configService = app.get(ConfigService);
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService)); //connect into socket io server websocket
  await app.listen(configService.get('PORT'));
}
bootstrap();
