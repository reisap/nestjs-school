import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { DatabaseModule } from '@app/common';
import { CommonModule } from '@app/common/common.module';
import { Post } from './entities/post.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import RedisClient from '@app/common/database/redis';
import {
  checkCachePost,
  checkCachePostById,
} from '@app/common/middleware/cache-post.redis';

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
    RedisClient,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [PostService],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkCachePostById)
      .forRoutes({ path: 'v1/post/:id', method: RequestMethod.GET });
    consumer
      .apply(checkCachePost)
      .forRoutes({ path: 'v1/post', method: RequestMethod.GET });
  }
}
