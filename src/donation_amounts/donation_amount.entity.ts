import { Donation } from 'src/donations/donation.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DonationAmount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  time: Date;

  @ManyToOne(() => User, (user) => user.donationAmounts)
  donor: User;

  @ManyToOne(() => Donation, (donation) => donation.donationAmounts)
  donation: Donation;
}
