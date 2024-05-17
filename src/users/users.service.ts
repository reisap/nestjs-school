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
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import * as bcrypt from 'bcryptjs';
import { randomString } from '@app/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordUser } from './dto/change-password-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UsersRepository) {}

  async changeUserPassword(changeUserPassword: ChangePasswordUser) {
    //1. check email ada di database atau tidak
    //2. jika ada check password yang dulu dimasukan benar atau tidak
    //3. update password dengan yang baru
    try {
      //1
      const result = await this.userRepository.findOneParams({
        email: changeUserPassword.email,
      });

      if (!result || result == undefined || result == null) {
        throw new BadRequestException('email not found !!');
      }

      //2
      const match = await bcrypt.compare(
        changeUserPassword.password,
        result.password,
      );
      if (!match) {
        throw new BadRequestException('password not match !!');
      }
      //3
      const user = await this.userRepository.update(result.id, {
        password: changeUserPassword.new_password,
      });

      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async verifyUserByEmailToken(token: string) {
    try {
      //search user by token generate
      const user = await this.userRepository.findOneParams({
        activationToken: token,
      });
      if (!user || user == null || user == undefined) {
        throw new BadRequestException('token activation expired !');
      }
      //update status user active
      const result = await this.userRepository.update(user.id, {
        inactive: false,
        activationToken: null,
      });

      return result;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(loginUser: LoginUserDto) {
    const user = await this.userRepository.findOneParams({
      email: loginUser.email,
    });
    if (!user) {
      throw new NotFoundException('email not found');
    }
    const match = await bcrypt.compare(loginUser.password, user.password);
    if (!match) {
      throw new BadRequestException('password not match');
    }
    return user;
  }
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
      const result = await this.userRepository.update(id, {
        ...updateUserDto,
        update_date: new Date().toISOString(),
      });
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
