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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { PostPostTagAddDto } from './dtos/post-posttags-add.dto';

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
  getPostByGroupId(@Param('groupId') groupId: string) {
    return this.postsService.getPostByGroupId(parseInt(groupId));
  }

  @Get('/:id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(parseInt(id));
  }

  @Patch('upvote/:id')
  upVote(@Param('id') id: string) {
    return this.postsService.upVote(parseInt(id));
  }

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Post('/posttags/add')
  addPostTag(@Body() body: PostPostTagAddDto) {
    return this.postsService.addPostTag(body.postId, body.postTagId);
  }

  @Get('/posttags/:postId')
  getPostTagsByPostId(@Param('postId') postId: string) {
    return this.postsService.getPostTagsByPostId(parseInt(postId));
  }
}
