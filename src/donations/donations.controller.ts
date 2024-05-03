import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dtos/create-donation.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DonationImageService } from './donation-image.service';

@Controller('donations')
export class DonationsController {
  constructor(
    private donationsService: DonationsService,
    private donationImageService: DonationImageService,
  ) {}

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

  @Get()
  getDonations() {
    return this.donationsService.getDonations();
  }

  @Patch('/image_upload/:donation_id')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file,
    @Param('donation_id') donation_id: string,
  ) {
    const url = await this.donationImageService.uploadImage(file);
    return this.donationsService.update_image(parseInt(donation_id), url);
  }
}
