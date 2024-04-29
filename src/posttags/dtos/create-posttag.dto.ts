import { IsString } from 'class-validator';

export class CreatePostTagDto {
  @IsString()
  name: string;
}
