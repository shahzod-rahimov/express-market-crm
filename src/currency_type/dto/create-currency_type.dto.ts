import { IsString } from 'class-validator';

export class CreateCurrencyTypeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
