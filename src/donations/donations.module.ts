import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/donations/donation.entity';
import { UsersModule } from 'src/users/users.module';
import { DonationImageService } from './donation-image.service';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), UsersModule],

  controllers: [DonationsController],
  providers: [DonationsService, DonationImageService, CloudinaryService],
  exports: [DonationsService],
})
export class DonationsModule {}
