import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UniversitiesService } from 'src/universities/universities.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersImageService } from './users-image.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private userImageService: UsersImageService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const user = this.usersService.create(
      body.name,
      body.email,
      body.dob,
      body.password,
      body.imageUrl,
      body.universityId,
    );
    return user;
  }

  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException(`user with id:${id} not found!`);
    }

    return user;
  }

  @Patch('/image_upload/:user_id')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file, @Param('user_id') user_id: string) {
    const url = await this.userImageService.uploadImage(file);
    return this.usersService.update(parseInt(user_id), url);
  }
}
