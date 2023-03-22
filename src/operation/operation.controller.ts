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
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { CreatorGuard, IsActiveGuard } from '../common/guards';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @UseGuards(IsActiveGuard)
  @Get()
  findAll() {
    return this.operationService.findAll();
  }

  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(+id);
  }
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(+id, updateOperationDto);
  }
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(+id);
  }
}
