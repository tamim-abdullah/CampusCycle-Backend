import { ProductImage } from 'src/product-images/product-image.entity';
import { ProductType } from 'src/product-types/product-types.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
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

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];
}
