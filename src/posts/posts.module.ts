import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';
import { PosttagsModule } from 'src/posttags/posttags.module';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';
import { PostsImageService } from './posts-image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    GroupsModule,
    UsersModule,
    PosttagsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, CloudinaryService, PostsImageService],
  exports: [PostsService],
})
export class PostsModule {}
