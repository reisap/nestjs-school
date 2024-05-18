import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { randomString } from '@app/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordUser } from './dto/change-password-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly userRepository: UsersRepository) {}

  async changeUserPassword(changeUserPassword: ChangePasswordUser) {
    try {
      const user = await this.userRepository.findOneParams({
        email: changeUserPassword.email,
      });
      if (!user) {
        throw new BadRequestException('email not found !!');
      }

      const isMatch = await bcrypt.compare(
        changeUserPassword.password,
        user.password,
      );
      if (!isMatch) {
        throw new BadRequestException('password not match !!');
      }

      user.password = await bcrypt.hash(changeUserPassword.new_password, 12);
      return await this.userRepository.update(user.id, user);
    } catch (e) {
      this.logger.error('Error changing user password', e);
      throw new BadRequestException(e.message);
    }
  }

  async verifyUserByEmailToken(token: string) {
    try {
      const user = await this.userRepository.findOneParams({
        activationToken: token,
      });
      if (!user) {
        throw new BadRequestException('token activation expired !');
      }

      user.inactive = false;
      user.activationToken = null;
      return await this.userRepository.update(user.id, user);
    } catch (e) {
      this.logger.error('Error verifying user by email token', e);
      throw new BadRequestException(e.message);
    }
  }

  async login(loginUser: LoginUserDto) {
    try {
      const user = await this.userRepository.findOneParams({
        email: loginUser.email,
      });
      if (!user) {
        throw new NotFoundException('email not found');
      }

      const isMatch = await bcrypt.compare(loginUser.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('password not match');
      }

      return user;
    } catch (e) {
      this.logger.error('Error logging in', e);
      throw new BadRequestException(e.message);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 12),
        activationToken: randomString(16),
      };
      return await this.userRepository.save(newUser);
    } catch (e) {
      this.logger.error('Error creating user', e);
      throw new UnprocessableEntityException(e.message);
    }
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    try {
      return await this.userRepository.findAll({ skip: page, take: limit });
    } catch (e) {
      this.logger.error('Error finding all users', e);
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneById(id);
    } catch (e) {
      this.logger.error('Error finding user by ID', e);
      throw new BadRequestException(e.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userRepository.update(id, {
        ...updateUserDto,
        update_date: new Date().toISOString(),
      });
    } catch (e) {
      this.logger.error('Error updating user', e);
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (e) {
      this.logger.error('Error removing user', e);
      throw new BadRequestException(e.message);
    }
  }
}
