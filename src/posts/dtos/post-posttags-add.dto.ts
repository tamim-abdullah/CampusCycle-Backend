import { IsNumber } from 'class-validator';

export class PostPostTagAddDto {
  @IsNumber()
  postId: number;

  @IsNumber()
  postTagId: number;
}
