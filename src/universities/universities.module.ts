import { Module } from '@nestjs/common';
import { UniversitiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([University])],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [UniversitiesService],
})
export class UniversitiesModule {}
