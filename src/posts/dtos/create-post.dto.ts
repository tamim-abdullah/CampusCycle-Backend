import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsNumber()
  groupId: number;

  @IsNumber()
  userId: number;

  @IsString()
  postType: string;
}
