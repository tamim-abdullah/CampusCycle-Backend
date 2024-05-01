import { IsString } from 'class-validator';

export class CreateEventTagDto {
  @IsString()
  name: string;
}
