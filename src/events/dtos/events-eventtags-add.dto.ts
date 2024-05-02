import { IsNumber } from 'class-validator';

export class EventsEventTagAddDto {
  @IsNumber()
  eventId: number;

  @IsNumber()
  eventTagId: number;
}
