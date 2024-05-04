import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bidding } from './bidding.entity';
import { ProductsBiddedService } from './../products-bidded/products-bidded.service';
import { UsersService } from './../users/users.service';
import { ProductBidded } from 'src/products-bidded/product-bidded.entity';

@Injectable()
export class BiddingsService {
  constructor(
    @InjectRepository(Bidding) private repository: Repository<Bidding>,
    private productsBiddedService: ProductsBiddedService,
    private usersService: UsersService,
  ) {}

  async makeBidding(
    biddingPrice: number,
    productBiddedId: number,
    userId: number,
  ) {
    const productBidded =
      await this.productsBiddedService.getProductById(productBiddedId);
    const user = await this.usersService.findOne(userId);

    const bidding = this.repository.create({
      biddingPrice: biddingPrice,
      user: user,
      productBidded: productBidded,
      biddingTime: new Date(),
    });

    return this.repository.save(bidding);
  }

  async getBiddingsByProductId(productBiddedId: number) {
    const productBidded =
      await this.productsBiddedService.getProductById(productBiddedId);

    const biddings = await this.repository.find({
      where: { productBidded: productBidded },
      relations: ['productBidded', 'user'],
    });

    return biddings;
  }

  async getMaxBiddingPriceByProductId(productBiddedId: number) {
    const productBidded =
      await this.productsBiddedService.getProductById(productBiddedId);

    const maxBidding = await this.repository.maximum('biddingPrice', {
      productBidded: productBidded,
    });

    const biddingMax = await this.repository.find({
      where: { biddingPrice: maxBidding },
      relations: ['productBidded', 'user'],
    });

    return biddingMax;
  }

  async getTopBiddingsByProductId(productBiddedId: number) {
    const productBidded =
      await this.productsBiddedService.getProductById(productBiddedId);

    const biddings = await this.repository.find({
      where: { productBidded: productBidded },
      relations: ['productBidded', 'user'],
      order: { biddingPrice: 'DESC' },
    });

    return biddings;
  }

  async sellAtMaxBiddingPrice(productBiddedId: number) {
    const productBidded =
      await this.productsBiddedService.getProductById(productBiddedId);
    
    
  }
}
