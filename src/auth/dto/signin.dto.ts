// import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'Admin email' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1234567', description: 'Admin password' })
  @IsString()
  readonly password: string;
}
