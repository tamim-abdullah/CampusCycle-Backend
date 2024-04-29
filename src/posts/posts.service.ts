import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { GroupsService } from './../groups/groups.service';
import { UsersService } from './../users/users.service';
import { PostTagsService } from './../posttags/posttags.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private repository: Repository<Post>,
    private groupsService: GroupsService,
    private userService: UsersService,
    private postTagsService: PostTagsService,
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
    console.log(groupId);
    console.log(group);

    return this.repository.find({
      where: { group },
      relations: ['group', 'user'],
    });
  }

  async getPostById(id: number) {
    const post = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['group', 'user'],
    });
    return post;
  }

  async upVote(id: number) {
    const post = await this.getPostById(id);
    post.upVote = post.upVote + 1;

    return this.repository.save(post);
  }

  async getAll() {
    return this.repository.find({ relations: ['group', 'user'] });
  }

  async addPostTag(postId: number, postTagId: number) {
    const post = await this.repository.findOne({
      where: { id: postId },
      relations: ['postTags'],
    });
    console.log(post);

    // Now the hardest part, bring the postTag service here, it gives me headache
    const postTag = await this.postTagsService.findById(postTagId);

    post.postTags = post.postTags || []; // Initialize groups array if it's undefined

    post.postTags.push(postTag);

    return this.repository.save(post);
  }

  async getPostTagsByPostId(postId: number) {
    const post = await this.repository.findOne({
      where: { id: postId },
      relations: ['postTags'],
    });

    return post.postTags;
  }

  async getUniversityIdByPostId(postId: number) {
    const post = await this.repository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    const user = post.user;

    const university = this.userService.findUniversityByUserId(user.id);
    return university;
  }
}
