import { Controller, Post, Body, Param, Patch, UploadedFile, UseInterceptors, Get } from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventsImageService } from './events-image.service';
import { EventsEventTagAddDto } from './dtos/events-eventtags-add.dto';

@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService,
    private eventImageService: EventsImageService,
    ) {}

  @Post('/create-event')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Patch('/image_upload/:event_id')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file, @Param('event_id') event_id: string) {
    const url = await this.eventImageService.uploadImage(file);
    return this.eventService.update_image(parseInt(event_id), url);
  }

  @Post('/eventtags/add')
  addPostTag(@Body() body: EventsEventTagAddDto) {
    return this.eventService.addEventTag(body.eventId, body.eventTagId);
  }

  @Get('/eventtags/:eventId')
  getEventTagsByEventId(@Param('eventId') eventId: string) {
    return this.eventService.getEventTagsByEventId(parseInt(eventId));
  }
}