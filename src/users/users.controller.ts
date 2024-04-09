import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UniversitiesService } from 'src/universities/universities.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
}
