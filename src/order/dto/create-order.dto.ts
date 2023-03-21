import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  order_unique_id: string;

  @IsString()
  full_name: string;

  @IsPhoneNumber('UZ')
  phone_number: string;

  @IsString()
  product_link: string;

  @IsNumber()
  summa: number;

  @IsNumber()
  currency_type_id: number;

  @IsString()
  truck: string;

  @IsString()
  description: string;
}
