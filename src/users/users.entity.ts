import { Bidding } from 'src/biddings/bidding.entity';
import { Comment } from 'src/comments/comment.entity';
import { DonationAmount } from 'src/donation_amounts/donation_amount.entity';
import { Donation } from 'src/donations/donation.entity';
import { Group } from 'src/groups/group.entity';
import { Post } from 'src/posts/post.entity';
import { University } from 'src/universities/university.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column()
  password: string;

  @Column()
  phoneNo: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => University, (university) => university.users)
  university: University;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups: Group[];

  @OneToMany(() => Donation, (donation) => donation.creator)
  creatorDonations: Donation[];

  @OneToMany(() => Donation, (donation) => donation.organizer)
  organizerDonations: Donation[];

  @OneToMany(() => DonationAmount, (donationAmount) => donationAmount.donor)
  donationAmounts: DonationAmount[];

  @OneToMany(() => Bidding, (bidding) => bidding.user)
  biddings: Bidding[];
}
