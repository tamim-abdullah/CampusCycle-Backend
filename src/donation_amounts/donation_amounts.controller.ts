import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DonationAmountsService } from './donation_amounts.service';
import { CreateDonationAmountDto } from './dtos/create-donation-amount.dto';

@Controller('donation-amounts')
export class DonationAmountsController {
  constructor(private donationAmountsService: DonationAmountsService) {}

  @Get('/all')
  getA() {
    return this.donationAmountsService.getTotalDonation();
  }

  @Get('/top-donor-whole')
  getTopDonorWhole() {
    return this.donationAmountsService.getTopDonorWhole();
  }

  @Post('/create')
  async createDonation(@Body() body: CreateDonationAmountDto) {
    const donationAmount = await this.donationAmountsService.create(
      body.amount,
      body.donorId,
      body.donationId,
    );

    return donationAmount;
  }

  @Get('/:id')
  getDonationAmountById(@Param('id') id: string) {
    return this.donationAmountsService.getDonationAmountById(parseInt(id));
  }

  @Get('/top/:donation_id')
  getTopDonationAmountsByDonationId(@Param('donation_id') donationId: string) {
    return this.donationAmountsService.getTopDonationAmountsByDonationId(
      parseInt(donationId),
    );
  }

  @Get('/total/:donation_id')
  getTotalAmountByDonationId(@Param('donation_id') donationId: string) {
    return this.donationAmountsService.getTotalAmountByDonationId(
      parseInt(donationId),
    );
  }
}
