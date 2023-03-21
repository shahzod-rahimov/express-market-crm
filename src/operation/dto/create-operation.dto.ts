import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOperationDto {
  @IsNumber()
  order_id: number;

  @IsNumber()
  status_id: number;

  @IsDateString()
  operation_date: Date;

  @IsNumber()
  admin_id: number;

  @IsString()
  description: string;
}
