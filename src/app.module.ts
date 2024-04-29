import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UniversitiesModule } from './universities/universities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './universities/university.entity';
import { User } from './users/users.entity';
import { GroupsModule } from './groups/groups.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { Group } from './groups/group.entity';
import { Post } from './posts/post.entity';
import { Comment } from './comments/comment.entity';
import { EventsModule } from './events/events.module';
import { EventEntity } from './events/events.entity';
import { PosttagsModule } from './posttags/posttags.module';
import { PostTag } from './posttags/posttag.entity';

@Module({
  imports: [
    UsersModule,
    UniversitiesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [University, User, EventEntity, Group, Post, Comment, PostTag],
      synchronize: true,
    }),
    GroupsModule,
    PostsModule,
    CommentsModule,
    EventsModule,
    PosttagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
