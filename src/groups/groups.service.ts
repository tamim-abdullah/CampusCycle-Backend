import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UsersService } from 'src/users/users.service';

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

  async findWithUser(groupId: number) {
    const group = await this.repository.findOne({
      where: { id: groupId },
      relations: ['users'],
    });

    return group.users;
  }

  async update_image(groupId: number, url: string) {
    const group = await this.repository.findOne({ where: { id: groupId } });

    group.imageurl = url;
    return this.repository.save(group);
  }
}
