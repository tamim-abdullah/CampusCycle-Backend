import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGroupDto } from './dtos/create-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post('/create')
  createGroup(@Body() body: CreateGroupDto) {
    const group = this.groupsService.create(body);
    return group;
  }

  @Get()
  findAll() {
    return this.groupsService.find();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.groupsService.findOne(parseInt(id));
  }
}
