
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsDate } from 'class-validator';

export class AddDeliveryDto { 
  @IsNumberString() 
  readonly packageWidth: number;
   
  @IsNumberString() 
  readonly packageHeight: number;
   
  @IsNumberString() 
  readonly cost: number;
  
  readonly description: string;

  @Type(() => Date)
  @IsDate()
  readonly deliveryDate: Date;
}