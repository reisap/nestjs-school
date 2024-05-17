import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { DatabaseModule } from '@app/common';
import { CommonModule } from '@app/common/common.module';
import { Post } from './entities/post.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [DatabaseModule.forFeature([Post]), CommonModule],
  controllers: [PostController],
  providers: [PostRepository, PostService, AuthGuard],
  exports: [PostService],
})
export class PostModule {}
