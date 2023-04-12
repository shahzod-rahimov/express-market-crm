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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreatorGuard, IsActiveGuard } from '../common/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { FromToOrderSearchDto } from './dto/from-to-order-date-search.dto';
import { Public } from '../common/decorators';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 200, type: Order })
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
  @Post('/search/bydate?')
  findByDate(
    @Query('page') pageNumber: string,
    @Body() fromToOrderSearchDto: FromToOrderSearchDto,
  ) {
    return this.orderService.findByDate(fromToOrderSearchDto, +pageNumber);
  }

  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, description: 'Updated' })
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

  @ApiOperation({ summary: 'Find by order status' })
  @ApiResponse({ status: 200, description: 'Find by order status' })
  @UseGuards(IsActiveGuard)
  @Get('search/bystatus?')
  findOrderOperation(
    @Query('status') status: string,
    @Query('page') pageNumber: string,
  ) {
    return this.orderService.findOrderOperation(status, +pageNumber);
  }

  @ApiOperation({ summary: 'Get order' })
  @ApiResponse({ status: 200, description: 'Get order by unique ID' })
  @Public()
  @Get('search/:unique_id')
  getOrderUniqueIdPublic(@Param('unique_id') id: string) {
    return this.orderService.getOrderUniqueId(id);
  }

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, type: Order })
  @UseGuards(IsActiveGuard)
  @Get('statistika/:date')
  statistika(@Param('date') date: Date) {
    return this.orderService.statistikaOrder(date);
  }
}
