import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class FromToOrderSearchDto {
  @ApiProperty({
    example: '2023-02-10T15:08:02.399Z',
    description: 'Order Date from',
  })
  @IsDateString()
  readonly from: Date;

  @ApiProperty({
    example: '2023-02-10T15:08:02.399Z',
    description: 'Order Date to',
  })
  @IsDateString()
  readonly to: Date;
}
