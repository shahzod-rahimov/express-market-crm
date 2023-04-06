import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class CheckTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U',
    description: 'JWT Token',
  })
  @IsJWT()
  readonly token: string;
}
