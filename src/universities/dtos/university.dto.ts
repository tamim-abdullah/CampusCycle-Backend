import { IsString } from 'class-validator';

export class UniversityDto {
  @IsString()
  shortName: string;

  @IsString()
  fullName: string;
}
