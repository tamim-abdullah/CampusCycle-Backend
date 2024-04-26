import { IsNumber, IsString, isNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsNumber()
  postId: number;

  @IsNumber()
  userId: number;
}
