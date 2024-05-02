import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { EventService } from '../events.service'; 

@Injectable()
export class CurrentEventInterceptor implements NestInterceptor {
  constructor(private eventService: EventService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { eventId } = request.session || {};

    if (eventId) {
      const event = await this.eventService.findOne(eventId);
      request.currentEvent = event;
    }

    return handler.handle();
  }
}
