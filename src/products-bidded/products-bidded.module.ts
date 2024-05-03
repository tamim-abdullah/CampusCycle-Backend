import { Module } from '@nestjs/common';
import { ProductsBiddedController } from './products-bidded.controller';
import { ProductsBiddedService } from './products-bidded.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBidded } from './product-bidded.entity';
import { ProductTypesModule } from 'src/product-types/product-types.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductBidded]), ProductTypesModule],
  controllers: [ProductsBiddedController],
  providers: [ProductsBiddedService],
  exports: [ProductsBiddedService],
})
export class ProductsBiddedModule {}
