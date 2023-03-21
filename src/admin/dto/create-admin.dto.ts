// import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  readonly full_name: string;

  @IsString()
  @Matches(/^[A-Za-z][A-Za-z0-9_]{3,25}$/)
  readonly user_name: string;

  @IsString()
  readonly tg_link: string;

  @IsPhoneNumber('UZ')
  readonly phone_number: string;
  // @ApiProperty({
  //   example: 'user1@mail.uz',
  //   description: 'Foydalanuvchi elektron pochtasi',
  // })
  @IsString()
  @IsEmail()
  readonly email: string;

  // @ApiProperty({
  //   example: '1234567',
  //   description: 'Foydalanuvchi paroli',
  // })
  @IsString()
  readonly hashed_password: string;
}
