import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsEnum({ zero: '0', one: '1', two: '2' })
  readonly status: string;

  @ApiProperty({
    example: 'asdfjgksdjgkjjerdgsngkjdsnfkg',
    description: 'Operation description',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
}
