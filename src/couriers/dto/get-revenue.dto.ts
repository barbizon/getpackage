
import { Type } from 'class-transformer';
import { IsDate, Validate} from 'class-validator';
import { IsBeforeConstraint } from 'src/validation/is-before.constraint';

export class GetRevenueDto {
  @Validate(IsBeforeConstraint, ['dateTo'])
  @Type(() => Date)
  @IsDate()
  readonly dateFrom: Date;

  @Type(() => Date)
  @IsDate()
  readonly dateTo: Date;
}
