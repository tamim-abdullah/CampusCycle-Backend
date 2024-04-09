import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUniversityDto } from './dtos/create-university.dto';
import { UniversitiesService } from './universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private universitiesService: UniversitiesService) {}

  @Post('/create')
  createUniversity(@Body() body: CreateUniversityDto) {
    const university = this.universitiesService.create(body);
    return university;
  }

  @Get()
  find() {
    return this.universitiesService.find();
  }

  @Get('/:id')
  findOne(id: number) {
    return this.universitiesService.findOne(id);
  }
}
