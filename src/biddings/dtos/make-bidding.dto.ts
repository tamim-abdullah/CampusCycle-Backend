import { IsNumber } from 'class-validator';

export class MakeBiddingDto {
  @IsNumber()
  biddingPrice: number;

  @IsNumber()
  productBiddedId: number;

  @IsNumber()
  userId: number;
}
