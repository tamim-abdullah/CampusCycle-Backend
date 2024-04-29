import { IsNumber } from 'class-validator';

export class UserGroupJoinDto {
  @IsNumber()
  groupId: number;

  @IsNumber()
  userId: number;
}
