import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCurrencyTypeDto {
  @ApiProperty({ example: 'sum', description: 'Currency name' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'qwertytasdfgfdcxvcbngfretyujh',
    description: 'Currency description',
  })
  @IsString()
  readonly description: string;
}
