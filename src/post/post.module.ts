import { Module, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { DatabaseModule } from '@app/common';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [DatabaseModule.forFeature([Post]), CommonModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
