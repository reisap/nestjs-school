import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { DatabaseModule } from '@app/common';
import { CommonModule } from '@app/common/common.module';
import { Post } from './entities/post.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { NotificationModule } from 'src/notification/notification.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [
    DatabaseModule.forFeature([Post]),
    CommonModule,
    NotificationModule,
  ],
  controllers: [PostController],
  providers: [
    PostRepository,
    PostService,
    AuthGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [PostService],
})
export class PostModule {}
