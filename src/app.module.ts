import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { LoggerModule, DatabaseModule } from '@app/common';

@Module({
  imports: [AuthModule, DatabaseModule, PostModule, UsersModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//karena ini bersifat monorepo maka fungsi dari database module belum sepowerfull itu, masih sama saja dengan typeorm biasa
