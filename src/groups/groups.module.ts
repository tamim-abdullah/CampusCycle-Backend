import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import { UsersModule } from 'src/users/users.module';
import { GroupsImageService } from './groups-image.service';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService, GroupsImageService, CloudinaryService],
  exports: [GroupsService],
})
export class GroupsModule {}
