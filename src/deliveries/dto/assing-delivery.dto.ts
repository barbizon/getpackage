
import { IsNotEmpty } from 'class-validator';

export class AssignDeliveryDto {
  @IsNotEmpty()
  readonly delivery: string;
  
  @IsNotEmpty()
  readonly courier: string;
}
