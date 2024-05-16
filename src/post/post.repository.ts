import { AbstractRepository, BaseInterfaceRepository } from '@app/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

interface PostRepositoryInterface extends BaseInterfaceRepository<Post> {}

@Injectable()
export class PostRepository
  extends AbstractRepository<Post>
  implements PostRepositoryInterface
{
  protected readonly logger: Logger;
  constructor(@InjectRepository(Post) postRepository: Repository<Post>) {
    super(postRepository);
  }
}
