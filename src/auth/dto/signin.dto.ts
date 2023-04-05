// import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'john_doe', description: 'Admin username' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: '1234567', description: 'Admin password' })
  @IsString()
  readonly password: string;
}
