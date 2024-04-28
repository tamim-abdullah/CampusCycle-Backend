import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/create')
  async createComment(@Body() body: CreateCommentDto, @Session() session: any) {
    const post = await this.commentsService.create(
      body.content,
      body.postId,
      body.userId,
    );

    return post;
  }

  @Get('/posts/:postId')
  getCommentsByPostId(@Param('postId') postId: string) {
    return this.commentsService.getCommentsByPostId(parseInt(postId));
  }

  @Get('/:id')
  getCommentBytId(@Param('id') id: string) {
    return this.commentsService.getCommentsByPostId(parseInt(id));
  }

  @Patch('upvote/:id') // Here id means comment-id
  upVote(@Param('id') id: string) {
    return this.commentsService.upVote(parseInt(id));
  }
}
