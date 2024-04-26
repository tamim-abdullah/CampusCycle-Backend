import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/create')
  async createPost(@Body() body: CreatePostDto, @Session() session: any) {
    const post = await this.postsService.create(
      body.content,
      body.groupId,
      body.userId,
      body.postType,
    );

    return post;
  }

  @Get('group/:groupId')
  getPostByGroupId(groupId: number) {
    return this.postsService.getPostByGroupId(groupId);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(parseInt(id));
  }

  @Patch('upvote/:id')
  upVote(@Param('id') id: string) {
    return this.postsService.upVote(parseInt(id));
  }
}
