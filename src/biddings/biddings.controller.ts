import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BiddingsService } from './biddings.service';
import { MakeBiddingDto } from './dtos/make-bidding.dto';

@Controller('biddings')
export class BiddingsController {
  constructor(private biddingsService: BiddingsService) {}

  @Post('/make-bidding')
  async makeBidding(@Body() body: MakeBiddingDto) {
    const bidding = await this.biddingsService.makeBidding(
      body.biddingPrice,
      body.productBiddedId,
      body.userId,
    );

    return bidding;
  }

  @Get('/:productId')
  getBiddingsByProductId(@Param('productId') productId: number) {
    return this.biddingsService.getBiddingsByProductId(productId);
  }

  @Get('/max/:productId')
  getMaxBidding(@Param('productId') productId: number) {
    return this.biddingsService.getMaxBiddingPriceByProductId(productId);
  }

  @Get('/top/:productId')
  getTopBidding(@Param('productId') productId: number) {
    return this.biddingsService.getTopBiddingsByProductId(productId);
  }
}
