import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOperationDto {
  @ApiProperty({ example: '2', description: 'Order ID' })
  @IsNumber()
  readonly order_id: number;

  @ApiProperty({ example: '3', description: 'Status ID' })
  @IsNumber()
  readonly status_id: number;

  @ApiProperty({ example: '2023-12-12', description: 'Operation date' })
  @IsDateString()
  readonly operation_date: Date;

  @ApiProperty({ example: '4', description: 'Admin ID' })
  @IsNumber()
  readonly admin_id: number;

  @ApiProperty({
    example: 'asdfjgksdjgkjjerdgsngkjdsnfkg',
    description: 'Operation description',
  })
  @IsString()
  readonly description: string;
}
