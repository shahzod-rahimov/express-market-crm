// import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Admin fullname' })
  @IsString()
  readonly full_name: string;

  @ApiProperty({ example: 'johndoe', description: 'Admin username' })
  @IsString()
  @Matches(/^[A-Za-z][A-Za-z0-9_]{3,25}$/)
  readonly user_name: string;

  @ApiProperty({
    example: 'https://t.me/johndoe',
    description: 'Admin telegram link',
  })
  @IsString()
  @IsOptional()
  readonly tg_link: string;

  @ApiProperty({ example: '991234567', description: 'Admin phone number' })
  @IsPhoneNumber('UZ')
  @IsOptional()
  readonly phone_number: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'Admin email' })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ example: '991234567', description: 'Admin password' })
  @IsString()
  readonly hashed_password: string;
}
