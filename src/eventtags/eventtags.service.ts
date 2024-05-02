import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventTag } from './eventtag.entity';
import { Repository } from 'typeorm';
import { CreateEventTagDto } from './dtos/create-eventtag.dto';

@Injectable()
export class EventTagsService {
  constructor(
    @InjectRepository(EventTag) private repository: Repository<EventTag>,
  ) {}

  create(eventTagDto: CreateEventTagDto) {
    const eventTag = this.repository.create(eventTagDto);
    return this.repository.save(eventTag);
  }

  getAll() {
    const eventTags = this.repository.find();
    return eventTags;
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async findWithEvent(eventTagId: number) {
    const eventTag = await this.repository.findOne({
      where: { id: eventTagId },
      relations: ['events'],
    });

    return eventTag.events;
  }
}
