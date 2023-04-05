import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DisactiveteAdminDto {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @IsNumber()
  readonly id: number;
}
