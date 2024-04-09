import { IsString } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  shortName: string;

  @IsString()
  fullName: string;
}
