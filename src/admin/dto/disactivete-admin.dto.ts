import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class ActiveteAdminDto {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'true/false', description: 'Activate or not' })
  @IsBoolean()
  readonly value: boolean;
}
