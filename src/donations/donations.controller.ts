import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dtos/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private donationsService: DonationsService) {}

  @Post('/create')
  async createDonation(@Body() body: CreateDonationDto) {
    const donation = await this.donationsService.create(
      body.title,
      body.goalAmount,
      body.details,
      body.creatorId,
      body.organizerId,
    );

    return donation;
  }

  @Get('/:id')
  getDonationById(@Param('id') id: string) {
    return this.donationsService.getDonationById(parseInt(id));
  }
}
