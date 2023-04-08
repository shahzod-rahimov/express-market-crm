import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class FromToOrderSearchDto {
  @ApiProperty({
    example: '2023-02-10T15:08:02.399Z',
    description: 'Order Date from',
  })
  readonly from: Date;

  @ApiProperty({
    example: '2023-02-10T15:08:02.399Z',
    description: 'Order Date to',
  })
  readonly to: Date;
}
