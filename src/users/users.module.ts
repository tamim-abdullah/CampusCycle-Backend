import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UniversitiesModule } from 'src/universities/universities.module';
import { UsersImageService } from './users-image.service';
import { CloudinaryService } from './users-image-cloudinary.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UniversitiesModule, GroupsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersImageService,
    CloudinaryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
