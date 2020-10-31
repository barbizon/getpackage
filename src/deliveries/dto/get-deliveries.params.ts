
import { Type } from 'class-transformer';
import { IsDate, IsNumberString, IsOptional} from 'class-validator';

export class GetDeliveriesParam {
  @Type(() => Date)
  @IsDate()
  readonly deliveryDate: Date;

  @IsOptional()
  @IsNumberString()
  readonly pageNumber: number;
  
  @IsOptional()
  @IsNumberString()
  readonly pageSize: number;
}
