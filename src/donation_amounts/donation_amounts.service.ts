import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DonationAmount } from './donation_amount.entity';
import { Repository } from 'typeorm';
import { Donation } from 'src/donations/donation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationsService } from './../donations/donations.service';

@Injectable()
export class DonationAmountsService {
  constructor(
    @InjectRepository(DonationAmount)
    private repository: Repository<DonationAmount>,
    private usersService: UsersService,
    private donationsService: DonationsService,
  ) {}

  async create(amount: number, donorId: number, donationId: number) {
    const donor = await this.usersService.findOne(donorId);
    const donation = await this.donationsService.getDonationById(donationId);

    const donationAmount = this.repository.create({
      amount: amount,
      time: new Date(),
    });

    donationAmount.donation = donation;
    donationAmount.donor = donor;

    return this.repository.save(donationAmount);
  }

  async getDonationAmountById(id: number) {
    const donationAmount = await this.repository.findOne({
      where: { id },
      relations: ['donor', 'donation'],
    });
    console.log(donationAmount);
    return donationAmount;
  }

  async getTopDonationAmountsByDonationId(donationId: number) {
    const donation = await this.donationsService.getDonationById(donationId);

    const donationAmounts = await this.repository.find({
      where: { donation },
      relations: ['donor', 'donation'],
      order: { amount: 'DESC' },
    });

    return donationAmounts;
  }

  async getTotalAmountByDonationId(donationId: number) {
    const donation = await this.donationsService.getDonationById(donationId);

    const sum = await this.repository.sum('amount', { donation: donation });

    return sum;
  }

  async getTotalDonation() {
    const query = 'SELECT SUM(amount) AS totalAmount FROM donation_amount';
    //const query = 'select * from donation_amount';
    console.log('-------------------------------------------------');
    const result = await this.repository.query(query);

    console.log(result);

    const totalAmount: number = result[0].totalAmount;

    return totalAmount || 0;

    // Extracting the total amount from the query resul
  }

  async getTopDonorWhole() {
    const query =
      'SELECT donorId, SUM(amount) AS total_amount FROM donation_amount GROUP BY donorId ORDER BY total_amount DESC;';

    console.log('-------------------------------------------------');
    const result = await this.repository.query(query);

    console.log(result);
    return result;
  }

  //async getTopDonors
}
