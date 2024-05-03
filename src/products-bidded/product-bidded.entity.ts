import { Bidding } from 'src/biddings/bidding.entity';
import { ProductBiddedImage } from 'src/product-bidded-images/product-bidded-image.entity';
import { ProductType } from 'src/product-types/product-types.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductBidded {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  time: Date;

  @Column()
  price: number;

  @Column()
  lastSellingDate: Date;

  @Column()
  sellingCondition: number; // 0 means not sold, 1 means sold

  @ManyToOne(() => ProductType, (productType) => productType.products)
  productType: ProductType;

  @OneToMany(
    () => ProductBiddedImage,
    (productBiddedImage) => productBiddedImage.productBidded,
  )
  images: ProductBiddedImage[];

  @OneToMany(() => Bidding, (bidding) => bidding.productBidded)
  biddings: Bidding;

  @ManyToOne(() => User, (user) => user.biddings)
  user: User;
}
