import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostTag } from './posttag.entity';
import { Repository } from 'typeorm';
import { CreatePostTagDto } from './dtos/create-posttag.dto';

@Injectable()
export class PostTagsService {
  constructor(
    @InjectRepository(PostTag) private repository: Repository<PostTag>,
  ) {}

  create(postTagDto: CreatePostTagDto) {
    const postTag = this.repository.create(postTagDto);
    return this.repository.save(postTag);
  }

  getAll() {
    const postTags = this.repository.find();
    return postTags;
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async findWithPost(postTagId: number) {
    const postTag = await this.repository.findOne({
      where: { id: postTagId },
      relations: ['posts'],
    });

    return postTag.posts;
  }
}
