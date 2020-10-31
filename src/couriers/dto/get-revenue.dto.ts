
import { Type } from 'class-transformer';
import { IsDate, IsNumberString, IsOptional} from 'class-validator';

export class GetRevenueDto {
  @Type(() => Date)
  @IsDate()
  readonly dateFrom: Date;

  @Type(() => Date)
  @IsDate()
  readonly dateTo: Date;
}
