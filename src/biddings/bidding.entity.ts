import { ProductBidded } from 'src/products-bidded/product-bidded.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bidding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  biddingPrice: number;

  @Column()
  biddingTime: Date;

  @ManyToOne(() => ProductBidded, (productBidded) => productBidded.biddings)
  productBidded: ProductBidded;

  @ManyToOne(() => User, (user) => user.biddings)
  user: User;
}
