import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostTagsService } from './posttags.service';
import { CreatePostTagDto } from './dtos/create-posttag.dto';

@Controller('posttags')
export class PosttagsController {
  constructor(private postTagsService: PostTagsService) {}

  @Post('/create')
  createPostTag(@Body() body: CreatePostTagDto) {
    const postTag = this.postTagsService.create(body);
    return postTag;
  }

  @Get()
  getAll() {
    return this.postTagsService.getAll();
  }

  @Get('/posts/:postTagId')
  findUsersByGroupId(@Param('postTagId') postTagId: string) {
    return this.postTagsService.findWithPost(parseInt(postTagId));
  }
}
