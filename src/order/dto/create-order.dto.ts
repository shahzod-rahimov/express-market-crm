import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly order_unique_id: string;

  @IsString()
  readonly full_name: string;

  @IsPhoneNumber('UZ')
  readonly phone_number: string;

  @IsString()
  readonly product_link: string;

  @IsNumber()
  readonly summa: number;

  @IsNumber()
  readonly currency_type_id: number;

  @IsString()
  readonly truck: string;

  @IsString()
  readonly description: string;
}
