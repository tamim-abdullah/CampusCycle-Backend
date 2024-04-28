import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { GroupsService } from './../groups/groups.service';
import { UsersService } from './../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private repository: Repository<Post>,
    private groupsService: GroupsService,
    private userService: UsersService,
  ) {}

  async create(
    content: string,
    groupId: number,
    userId: number,
    postType: string,
  ) {
    const group = this.groupsService.findOne(groupId);
    const user = this.userService.findOne(userId);
    const time = new Date();
    const upVote = 0;

    const post = this.repository.create({
      content,
      time,
      upVote,
      postType,
    });

    post.group = await group;
    post.user = await user;

    return this.repository.save(post);
  }

  async getPostByGroupId(groupId: number) {
    const group = await this.groupsService.findOne(groupId);

    return this.repository.find({ where: { group } });
  }

  async getPostById(id: number) {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['group', 'user'],
    });
    return user;
  }

  async upVote(id: number) {
    const post = await this.getPostById(id);
    post.upVote = post.upVote + 1;

    return this.repository.save(post);
  }
}
