import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dob: string;

  @IsString()
  password: string;
}
