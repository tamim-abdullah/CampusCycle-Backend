import { IsArray, IsDate, IsString } from "class-validator";
import { Type } from 'class-transformer';
export class CreateEventDto {
  @IsString()
  image: string;
  
  @IsString()
  eventName: string;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @IsString()
  details: string;
  
  @IsString({ each: true })
  @IsArray()
  tags: string[];
}