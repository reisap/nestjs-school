import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from '@app/common/common.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    AuthModule,
    PostModule,
    UsersModule,
    CommonModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
