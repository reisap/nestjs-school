import {
  AbstractRepository,
  BaseInterfaceRepository,
} from '@app/common/database';
import { User } from './entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface UserRepositoryInterface extends BaseInterfaceRepository<User> {}

@Injectable()
export class UsersRepository
  extends AbstractRepository<User>
  implements UserRepositoryInterface
{
  protected readonly logger: Logger;
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository);
  }
}
