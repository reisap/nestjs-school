import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const result = await this.userRepository.save(createUserDto);
      console.log('ini result = ', result);

      return result;
    } catch (e) {
      throw new Error(e);
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
      throw new Error(e);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const result = await this.userRepository.findOneById(id);
      if (!result || typeof result === undefined || typeof result === null) {
        throw new Error('id not found');
      }
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const result = await this.userRepository.update(id, updateUserDto);
      if (!result || typeof result === undefined || typeof result === null) {
        throw new Error('id not found');
      }
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const result = await this.userRepository.delete(id);
      if (!result || typeof result === undefined || typeof result === null) {
        throw new Error('id not found');
      }
      return result;
    } catch (e) {
      throw new Error(e);
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
