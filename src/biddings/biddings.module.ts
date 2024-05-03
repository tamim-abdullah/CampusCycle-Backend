import { Module } from '@nestjs/common';
import { BiddingsController } from './biddings.controller';
import { BiddingsService } from './biddings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bidding } from './bidding.entity';
import { ProductsBiddedModule } from './../products-bidded/products-bidded.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bidding]),
    ProductsBiddedModule,
    UsersModule,
  ],

  controllers: [BiddingsController],
  providers: [BiddingsService],
})
export class BiddingsModule {}
