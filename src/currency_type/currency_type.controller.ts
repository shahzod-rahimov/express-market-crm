import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreatorGuard, IsActiveGuard } from '../common/guards';
import { CurrencyTypeService } from './currency_type.service';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';

@Controller('currency-type')
export class CurrencyTypeController {
  constructor(private readonly currencyTypeService: CurrencyTypeService) {}

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return this.currencyTypeService.create(createCurrencyTypeDto);
  }

  @UseGuards(IsActiveGuard)
  @Get()
  findAll() {
    return this.currencyTypeService.findAll();
  }

  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyTypeService.findOne(+id);
  }

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyTypeDto: UpdateCurrencyTypeDto,
  ) {
    return this.currencyTypeService.update(+id, updateCurrencyTypeDto);
  }

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyTypeService.remove(+id);
  }
}
