import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './events.entity';
import { CreateEventDto } from './dtos/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const createdEvent = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(createdEvent);
  }
}
