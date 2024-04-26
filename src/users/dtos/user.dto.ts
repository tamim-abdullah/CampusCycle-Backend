import { Expose, Type } from 'class-transformer';
import { UniversityDto } from 'src/universities/dtos/university.dto';
import { University } from 'src/universities/university.entity';
import { User } from '../users.entity';

export class UserDto {
  id: number;
  name: string;
  email: string;
  dob: string;
  imageUrl: string;
  university: University;

  static fromEntity(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.dob = user.dob;
    userDto.imageUrl = user.imageUrl;
    userDto.university = user.university;

    return userDto;
  }
}
