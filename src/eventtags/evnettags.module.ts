import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTag } from './eventtag.entity';
import { EventTagsController } from './eventtags.controller';
import { EventTagsService } from './eventtags.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventTag])],
  controllers: [EventTagsController],
  providers: [EventTagsService],
  exports: [EventTagsService],
})
export class EventtagsModule {}
