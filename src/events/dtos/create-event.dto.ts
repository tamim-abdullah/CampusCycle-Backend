export class CreateEventDto {
    readonly image: string;
    readonly eventName: string;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly details: string;
    readonly tags: string[];
  }