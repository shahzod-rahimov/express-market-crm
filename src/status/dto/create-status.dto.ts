import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'active', description: 'Status name' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'asdfgggfdsfggdnmfkjrhgjdfncnvdfkdnj',
    description: 'Status description',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
}
