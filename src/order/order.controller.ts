import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreatorGuard, IsActiveGuard } from '../common/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { Request } from 'express';
import { FromToOrderSearchDto } from './dto/from-to-order-date-search.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @UseGuards(IsActiveGuard)
  @Get('search/all?')
  findAll(@Query('page') pageNumber: string) {
    return this.orderService.findAll(+pageNumber);
  }

  @ApiOperation({ summary: 'Get order' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get orders by name' })
  @ApiResponse({ status: 200, type: [Order] })
  @UseGuards(IsActiveGuard)
  @Get('/search/byname?')
  findByName(@Query('name') name: string, @Query('page') pageNumber: string) {
    return this.orderService.findByName(name, +pageNumber);
  }

  @ApiOperation({ summary: 'Get order by unique ID' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(IsActiveGuard)
  @Get('/search/byuniqueid?')
  findByOrderUniqueId(@Query('id') id: string) {
    return this.orderService.findByOrderUniqueId(id);
  }

  @ApiOperation({ summary: 'Get order by date' })
  @ApiResponse({ status: 200, type: [Order] })
  @UseGuards(IsActiveGuard)
  @Get('/search/bydate')
  findByDate(@Body() fromToOrderSearchDto: FromToOrderSearchDto) {
    return this.orderService.findByDate(fromToOrderSearchDto);
  }

  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
