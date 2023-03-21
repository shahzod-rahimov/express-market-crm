import { IsString } from 'class-validator';

export class CreateCurrencyTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
