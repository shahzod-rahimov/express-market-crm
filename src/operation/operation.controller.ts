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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation } from './entities/operation.entity';

@ApiTags('Operation')
@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @ApiOperation({ summary: 'Create Operation' })
  @ApiResponse({ status: 200, type: Operation })
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @ApiOperation({ summary: 'Get all operations' })
  @ApiResponse({ status: 200, type: [Operation] })
  @UseGuards(IsActiveGuard)
  @Get()
  findAll() {
    return this.operationService.findAll();
  }

  @ApiOperation({ summary: 'Get operation' })
  @ApiResponse({ status: 200, type: Operation })
  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update operation' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(+id, updateOperationDto);
  }

  @ApiOperation({ summary: 'Delete operation' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(+id);
  }
}
