import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'active', description: 'Status name' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'asdfgggfdsfggdnmfkjrhgjdfncnvdfkdnj',
    description: 'Status description',
  })
  @IsString()
  readonly description: string;
}
