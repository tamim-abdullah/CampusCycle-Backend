import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './events.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventTagsService } from 'src/eventtags/eventtags.service';


@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    private eventTagsService: EventTagsService,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const createdEvent = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(createdEvent);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.eventRepository.findOneBy({ id });
  }

  async update_image(eventId: number, url: string) {
    const event = await this.findOne(eventId);
    if(event){
      console.log('-------EVENT FOUND--------');
    }

    if(!event){
      throw new NotFoundException('event not found!');
    }
    event.image = url;
    return this.eventRepository.save(event)
  }

  async addEventTag(eventId: number, eventTagId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['eventTags'],
    });
    console.log(event);

    const eventTag = await this.eventTagsService.findById(eventTagId);

    event.eventTags = event.eventTags || []; // Initialize groups array if it's undefined

    event.eventTags.push(eventTag);

    return this.eventRepository.save(event);
  }

  async getEventTagsByEventId(eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['eventTags'],
    });

    return event.eventTags;
  }
}
