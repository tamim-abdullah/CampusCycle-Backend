import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './events.entity';
import { CreateEventDto } from './dtos/create-event.dto';


@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
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

    if(!event){
      throw new NotFoundException('event not found!');
    }
    event.image = url;
    return this.eventRepository.save(event)
  }
}
