// import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ActivateAdminDto {
  // @ApiProperty({ example: '1', description: "User's ID" })
  @IsNumber()
  readonly id: number;
}
