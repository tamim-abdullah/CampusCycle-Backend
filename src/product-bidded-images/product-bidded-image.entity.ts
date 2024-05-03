import { ProductBidded } from 'src/products-bidded/product-bidded.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductBiddedImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => ProductBidded, (productBidded) => productBidded.images)
  productBidded: ProductBidded;
}
