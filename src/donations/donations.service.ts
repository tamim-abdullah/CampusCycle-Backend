import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './donation.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation) private repository: Repository<Donation>,
    private userService: UsersService,
  ) {}

  async create(
    title: string,
    goalAmount: number,
    details: string,
    creatorId: number,
    organizerId: number,
  ) {
    const creator = this.userService.findOne(creatorId);
    const organizer = this.userService.findOne(organizerId);

    const donation = this.repository.create({
      title: title,
      goalAmount: goalAmount,
      details: details,
      time: new Date(),
    });

    donation.creator = await creator;
    donation.organizer = await organizer;

    return this.repository.save(donation);
  }

  async getDonationById(id: number) {
    const donation = await this.repository.findOne({
      where: { id },
      relations: ['creator', 'organizer'],
    });
    console.log(donation);
    return donation;
  }
}
