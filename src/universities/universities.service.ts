import { Injectable } from '@nestjs/common';
import { University } from './university.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUniversityDto } from './dtos/create-university.dto';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(University) private repository: Repository<University>,
  ) {}

  create(universityDto: CreateUniversityDto) {
    const university = this.repository.create(universityDto);
    return this.repository.save(university);
  }

  find() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }
}
