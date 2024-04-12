import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersImageService } from './users-image.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { SignInUserDto } from './dtos/signin-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private userImageService: UsersImageService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard) // guard
  whoAmiI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.usersService.create(
      body.name,
      body.email,
      body.dob,
      body.password,
      body.imageUrl,
      body.universityId,
    );
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: SignInUserDto, @Session() session: any) {
    const user = await this.usersService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
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
    return this.usersService.update_image(parseInt(user_id), url);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
