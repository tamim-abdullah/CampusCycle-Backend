import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { EventTagsService } from "./eventtags.service";
import { CreateEventTagDto } from "./dtos/create-eventtag.dto";

@Controller('eventtags')
export class EventTagsController {
    constructor(private eventTagsService: EventTagsService){}

    @Post('/create')
    createEventTag(@Body() body: CreateEventTagDto) {
        const eventTag = this.eventTagsService.create(body);
        return eventTag;
    }

    @Get()
    getAll() {
        return this.eventTagsService.getAll();
    }

    @Get('/events/:eventTagId')
    findEventsByEventsTagId(@Param('eventTagId') eventTagId: string) {
        return this.eventTagsService.findWithEvent(parseInt(eventTagId));
    }
}