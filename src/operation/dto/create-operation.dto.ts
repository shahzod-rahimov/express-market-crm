import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOperationDto {
  @ApiProperty({ example: '2', description: 'Order ID' })
  @IsNumber()
  readonly order_id: number;

  @ApiProperty({ example: '4', description: 'Admin ID' })
  @IsNumber()
  readonly admin_id: number;

  @ApiProperty({
    example: '1',
    description: 'Operation status',
  })
  @IsOptional()
  @IsString()
  readonly status: string;

  @ApiProperty({
    example: 'asdfjgksdjgkjjerdgsngkjdsnfkg',
    description: 'Operation description',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
}
