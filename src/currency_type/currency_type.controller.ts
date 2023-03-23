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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatorGuard, IsActiveGuard } from '../common/guards';
import { CurrencyTypeService } from './currency_type.service';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { CurrencyType } from './entities/currency_type.entity';

@ApiTags('Currency-type')
@Controller('currency-type')
export class CurrencyTypeController {
  constructor(private readonly currencyTypeService: CurrencyTypeService) {}

  @ApiOperation({ summary: 'Create currency-type' })
  @ApiResponse({ status: 200, type: CurrencyType })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return this.currencyTypeService.create(createCurrencyTypeDto);
  }

  @ApiOperation({ summary: 'Get all currency-types' })
  @ApiResponse({ status: 200, type: [CurrencyType] })
  @UseGuards(IsActiveGuard)
  @Get()
  findAll() {
    return this.currencyTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get currency-type' })
  @ApiResponse({ status: 200, type: CurrencyType })
  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update currency-type' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyTypeDto: UpdateCurrencyTypeDto,
  ) {
    return this.currencyTypeService.update(+id, updateCurrencyTypeDto);
  }

  @ApiOperation({ summary: 'Deleted currency-type' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyTypeService.remove(+id);
  }
}
