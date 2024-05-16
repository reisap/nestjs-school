import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import ResponseDto from '@app/common/dto/response.dto';
import { Logger } from 'nestjs-pino';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  protected readonly logger: Logger;
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);

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
  async findOne(@Param('id') id: string) {
    const paramsId = parseInt(id);
    const result = await this.usersService.findOne(paramsId);
    return new ResponseDto({
      data: result,
    }).response();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const paramsId = parseInt(id);
    const result = await this.usersService.update(paramsId, updateUserDto);
    return new ResponseDto({
      data: result,
    }).response();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const paramsId = parseInt(id);
    const result = await this.usersService.remove(paramsId);
    return new ResponseDto({
      data: result,
    }).response();
  }
}
