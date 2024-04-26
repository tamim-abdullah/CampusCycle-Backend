import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsService } from './../posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repository: Repository<Comment>,
    private postsService: PostsService,
    private userService: UsersService,
  ) {}

  async create(content: string, postId: number, userId: number) {
    const post = this.postsService.getPostById(postId);
    const user = this.userService.findOne(userId);
    const time = new Date();
    const upVote = 0;

    const comment = this.repository.create({
      content,
      time,
      upVote,
    });

    comment.post = await post;
    comment.user = await user;

    return this.repository.save(comment);
  }

  async getCommentsByPostId(postId: number) {
    const post = await this.postsService.getPostById(postId);

    return this.repository.find({ where: { post } });
  }

  async upVote(id: number) {
    const comment = await this.repository.findOneBy({ id });
    comment.upVote = comment.upVote + 1;

    return this.repository.save(comment);
  }
}
