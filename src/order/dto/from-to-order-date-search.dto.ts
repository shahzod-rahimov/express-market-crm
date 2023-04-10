import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsString } from 'class-validator';

export class FromToOrderSearchDto {
  @ApiProperty({
    example: '2023-02-10T15:08:02.399Z',
    description: 'Order Date from',
  })
  @Type(() => Date)
  readonly from: Date;

  @ApiProperty({
    example: '2023-02-10T15:08:02.399Z',
    description: 'Order Date to',
  })
  @Type(() => Date)
  readonly to: Date;
}
