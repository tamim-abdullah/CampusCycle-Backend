import {
  IsDate,
  IsDateString,
  IsNumber,
  IsString,
  isDate,
  isNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  productTypeId: number;

  @IsDateString()
  lastSellingDate: Date;

  /*
  @IsNumber()
  sellingCondition: number; // 0 means not sold, 1 means sold
  */

  @IsNumber()
  sellerId: number;
}
