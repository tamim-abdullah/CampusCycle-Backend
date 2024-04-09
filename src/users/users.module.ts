import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UniversitiesService } from 'src/universities/universities.service';
import { University } from 'src/universities/university.entity';
import { Repository } from 'typeorm';
import { UniversitiesModule } from 'src/universities/universities.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UniversitiesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
