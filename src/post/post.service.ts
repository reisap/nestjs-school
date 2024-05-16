import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { Post } from './entities/post.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PostService {
  protected readonly logger: Logger;
  constructor(private readonly postRepository: PostRepository) {}
  async create(createPostDto: CreatePostDto) {
    try {
      const result = await this.postRepository.save({
        ...createPostDto,
      });
      return result;
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  async findAll(page: number, limit: number): Promise<Post[]> {
    try {
      const options = {
        skip: page,
        take: limit,
      };
      return await this.postRepository.findAll(options);
    } catch (e) {
      this.logger.error('error findAll');
      throw new ExceptionsHandler(e);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.postRepository.findOneById(id);
      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const result = await this.postRepository.update(id, updatePostDto);
      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.postRepository.delete(id);
      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
