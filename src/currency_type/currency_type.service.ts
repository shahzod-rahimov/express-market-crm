import { Injectable } from '@nestjs/common';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';

@Injectable()
export class CurrencyTypeService {
  create(createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return 'This action adds a new currencyType';
  }

  findAll() {
    return `This action returns all currencyType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currencyType`;
  }

  update(id: number, updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    return `This action updates a #${id} currencyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} currencyType`;
  }
}
