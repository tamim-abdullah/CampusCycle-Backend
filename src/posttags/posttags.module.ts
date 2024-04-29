import { Module } from '@nestjs/common';
import { PosttagsController } from './posttags.controller';
import { PostTagsService } from './posttags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from './posttag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostTag])],
  controllers: [PosttagsController],
  providers: [PostTagsService],
  exports: [PostTagsService],
})
export class PosttagsModule {}
