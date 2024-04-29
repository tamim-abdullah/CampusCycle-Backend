import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}