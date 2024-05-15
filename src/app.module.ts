import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@app/common/database';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, DatabaseModule, PostModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//karena ini bersifat monorepo maka fungsi dari database module belum sepowerfull itu, masih sama saja dengan typeorm biasa
