import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import ResponseDto from '@app/common/dto/response.dto';
import { NotificationService } from 'src/notification/notification.service';
import { typePusher } from '@app/common';

@Controller('v1/post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const result = await this.postService.create(createPostDto);

    //send notif into user
    await this.notificationService.pusherNotif({
      type: typePusher.newPost,
      channel: typePusher.newPost,
      event: typePusher.newPost,
      message: result,
    });

    return new ResponseDto({
      data: result,
    }).response();
  }

  @Get()
  async findAll(@Query() query, @Req() req: any) {
    console.log('ini user id dari token == ', req.userId);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const result = await this.postService.findAll(page, limit);

    return new ResponseDto({
      data: result,
    }).response();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const paramsId = parseInt(id);
    const result = await this.postService.findOne(paramsId);
    return new ResponseDto({
      data: result,
    }).response();
  }

  @Patch(':id')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const paramsId = parseInt(id);
    const result = await this.postService.update(paramsId, updatePostDto);
    return new ResponseDto({
      data: result,
    }).response();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
