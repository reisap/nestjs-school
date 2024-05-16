import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import * as bcrypt from 'bcryptjs';
import { randomString } from '@app/common';

@Injectable()
export class UsersService {
  protected readonly logger: Logger;
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User | any> {
    try {
      const result = await this.userRepository.save({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 12),
        activationToken: randomString(16),
      });
      return result;
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    try {
      const options = {
        skip: page,
        take: limit,
      };
      return await this.userRepository.findAll(options);
    } catch (e) {
      this.logger.error('error findAll');
      throw new ExceptionsHandler(e);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const result = await this.userRepository.findOneById(id);
      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const result = await this.userRepository.update(id, updateUserDto);
      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}

/*
//ini contoh jika ingin menggunakan abstract services
//alasan kenapa tidak menggunakan cara ini agar memisahkan proses bisnis dengan proses presenter/controller, jadi jangan ada logic bisnis di sebuah controller
@Injectable()
export class UsersService extends AbstractService {
  constructor(private readonly userRepository: Repository<User>) {
    super(userRepository);
  }
}
*/
