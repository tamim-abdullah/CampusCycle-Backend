import { DonationAmount } from 'src/donation_amounts/donation_amount.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.creatorDonations)
  creator: User;

  @Column({ nullable: true })
  time: Date;

  @ManyToOne(() => User, (user) => user.organizerDonations)
  organizer: User;

  @OneToMany(() => DonationAmount, (donationAmount) => donationAmount.donation)
  donationAmounts: DonationAmount[];

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  goalAmount: number;

  @Column()
  details: string;
}
