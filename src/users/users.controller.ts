import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Put,
  BadGatewayException,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import ResponseDto from '@app/common/dto/response.dto';
import { JwtAuthGuard } from '@app/common';
import { NotificationService } from '../notification/notification.service';
import { typeEmail } from '@app/common';
import { ChangePasswordUser } from './dto/change-password-user.dto';

@Controller('v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('/change-password')
  async setNewPasswordUser(@Body() changeUserPassword: ChangePasswordUser) {
    const result =
      await this.usersService.changeUserPassword(changeUserPassword);
    return new ResponseDto({ data: result }).response();
  }

  @Get('/verify')
  async verify(@Query('token') token: string) {
    if (!token) {
      throw new BadGatewayException(
        'This page is only for verification, you are not allowed here',
      );
    }
    const result = await this.usersService.verifyUserByEmailToken(token);
    return new ResponseDto({ data: result }).response();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    await this.notificationService.emailNotif({
      type: typeEmail.verification,
      email: result.email,
      token: result.activationToken,
    });
    return new ResponseDto({ data: result }).response();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const orderBy = query.order || 'id';
    const sort = query.sort || 'asc';
    const result = await this.usersService.findAll(page, limit, orderBy, sort);
    return new ResponseDto({ data: result }).response();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.findOne(parseInt(id));
    return new ResponseDto({ data: result }).response();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(parseInt(id), updateUserDto);
    return new ResponseDto({ data: result }).response();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(parseInt(id));
    return new ResponseDto({ data: result }).response();
  }
}
