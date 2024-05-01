import { IsNumber, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  title: string;

  @IsNumber()
  goalAmount: number;

  @IsString()
  details: string;

  @IsNumber()
  creatorId: number;

  @IsNumber()
  organizerId: number;
}
