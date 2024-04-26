import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dtos/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private repository: Repository<Group>) {}

  create(groupDto: CreateGroupDto) {
    const group = this.repository.create(groupDto);
    return this.repository.save(group);
  }

  find() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }
}
