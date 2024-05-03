import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dob: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  imageUrl: string | null;

  @IsString()
  phoneNo: string;

  @IsNumber()
  universityId: number;
}
