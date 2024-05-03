import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateGroupDto } from './dtos/create-group.dto';
import { GroupsService } from './groups.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GroupsImageService } from './groups-image.service';

@Controller('groups')
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private groupsImageService: GroupsImageService,
  ) {}

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

  @Get('/users/:groupId')
  findUsersByGroupId(@Param('groupId') groupId: string) {
    return this.groupsService.findWithUser(parseInt(groupId));
  }

  @Patch('/image_upload/:group_id')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file, @Param('group_id') group_id: string) {
    const url = await this.groupsImageService.uploadImage(file);
    return this.groupsService.update_image(parseInt(group_id), url);
  }
}
