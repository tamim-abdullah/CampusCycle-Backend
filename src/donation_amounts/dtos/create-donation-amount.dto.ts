import { IsNumber, IsString } from 'class-validator';

export class CreateDonationAmountDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  donorId: number;

  @IsNumber()
  donationId: number;
}
