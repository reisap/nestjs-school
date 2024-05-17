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
import { AuthGuard } from 'src/auth/auth.guard';
import { NotificationService } from 'src/notification/notification.service';
import { typeEmail } from '@app/common';
import { ChangePasswordUser } from './dto/change-password-user.dto';

@Controller('v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  protected readonly logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  //change password
  @Post('/change-password')
  async setNewPasswordUser(@Body() changeUserPassword: ChangePasswordUser) {
    const result =
      await this.usersService.changeUserPassword(changeUserPassword);
    return new ResponseDto({
      data: result,
    }).response();
  }

  //verify email user (new user)
  @Get('/verify')
  async verify(@Query() query) {
    const token = query?.token || '';
    if (token === '') {
      throw new BadGatewayException(
        'Sorry this is only for verification, you are not allowed in this page',
      );
    }
    const result = await this.usersService.verifyUserByEmailToken(token);
    return new ResponseDto({
      data: result,
    }).response();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);

    //send email into user
    await this.notificationService.emailNotif({
      type: typeEmail.verification,
      email: result.email,
      token: result.activationToken,
    });

    return new ResponseDto({
      data: result,
    }).response();
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const result = await this.usersService.findAll(page, limit);

    return new ResponseDto({
      data: result,
    }).response();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const paramsId = parseInt(id);
    const result = await this.usersService.findOne(paramsId);
    return new ResponseDto({
      data: result,
    }).response();
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const paramsId = parseInt(id);
    const result = await this.usersService.update(paramsId, updateUserDto);
    return new ResponseDto({
      data: result,
    }).response();
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const paramsId = parseInt(id);
    const result = await this.usersService.remove(paramsId);
    return new ResponseDto({
      data: result,
    }).response();
  }
}
