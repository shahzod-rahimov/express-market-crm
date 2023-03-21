import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { CurrencyType } from './entities/currency_type.entity';

@Injectable()
export class CurrencyTypeService {
  constructor(
    @InjectModel(CurrencyType) private currencyModel: typeof CurrencyType,
  ) {}

  create(createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return this.currencyModel.create({ ...createCurrencyTypeDto });
  }

  findAll() {
    return this.currencyModel.findAll({});
  }

  async findOne(id: number) {
    const currency = await this.currencyModel.findOne({ where: { id } });
    if (!currency) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return currency;
  }

  async update(id: number, updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    const updatedCurrency = await this.currencyModel.update(
      updateCurrencyTypeDto,
      {
        where: { id },
      },
    );

    if (!updatedCurrency[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Updated', HttpStatus.OK);
  }

  async remove(id: number) {
    const deletedCurrency = await this.currencyModel.destroy({ where: { id } });

    if (!deletedCurrency) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Deleted', HttpStatus.OK);
  }
}
