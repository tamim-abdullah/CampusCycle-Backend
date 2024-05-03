import { Module } from '@nestjs/common';
import { DonationAmountsController } from './donation_amounts.controller';
import { DonationAmountsService } from './donation_amounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationAmount } from './donation_amount.entity';
import { UsersModule } from 'src/users/users.module';
import { DonationsModule } from 'src/donations/donations.module';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DonationAmount]),
    UsersModule,
    DonationsModule,
  ],
  controllers: [DonationAmountsController],
  providers: [DonationAmountsService, CloudinaryService],
})
export class DonationAmountsModule {}
