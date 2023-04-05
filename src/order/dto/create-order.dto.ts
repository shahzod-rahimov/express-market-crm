import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'John Doe', description: 'Customer fullname' })
  @IsString()
  readonly full_name: string;

  @ApiProperty({ example: '991234567', description: 'Customer phone number' })
  @IsPhoneNumber('UZ')
  readonly phone_number: string;

  @ApiProperty({
    example: 'https://akmalexpress/phone/1',
    description: 'Product link',
  })
  @IsString()
  readonly product_link: string;

  @ApiProperty({ example: '1000000', description: 'Product price' })
  @IsNumber()
  readonly summa: number;

  @ApiProperty({
    example: '1000000',
    description: 'Product advance payment ',
  })
  @IsNumber()
  @IsOptional()
  readonly advance_payment: number;

  @IsOptional()
  @ApiProperty({ example: 'qwergffdfgghghrtnjjxc', description: 'Description' })
  @IsString()
  @IsOptional()
  readonly description: string;
}
