import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOperationDto {
  @IsNumber()
  readonly order_id: number;

  @IsNumber()
  readonly status_id: number;

  @IsDateString()
  readonly operation_date: Date;

  @IsNumber()
  readonly admin_id: number;

  @IsString()
  readonly description: string;
}
