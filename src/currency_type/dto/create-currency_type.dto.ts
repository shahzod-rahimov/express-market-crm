import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCurrencyTypeDto {
  @ApiProperty({ example: 'sum', description: 'Currency name' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'qwertytasdfgfdcxvcbngfretyujh',
    description: 'Currency description',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
}
