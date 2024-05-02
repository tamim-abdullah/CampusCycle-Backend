import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { EventEntity } from './events.entity';
import { EventsImageService } from './events-image.service';
import { CloudinaryService } from './events-image-cloudinary.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentEventInterceptor } from './interceptors/current-event.interceptor';
import { EventtagsModule } from 'src/eventtags/evnettags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    EventtagsModule,
  ],
  controllers: [EventController],
  providers: [
    EventService,
    EventsImageService,
    CloudinaryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentEventInterceptor,
    }
  ],
  exports: [EventService]
})
export class EventsModule {}
