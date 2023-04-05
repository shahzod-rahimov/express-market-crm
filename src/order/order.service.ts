import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Op } from 'sequelize';
import { FromToOrderSearchDto } from './dto/from-to-order-date-search.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderModel.create({ ...createOrderDto });

    order.order_unique_id = (1000 + order.id).toString();

    await order.save();
    return order;
  }

  async findAll(pageNumber: number) {
    const PAGE_SIZE = 10;
    const offset = (pageNumber - 1) * PAGE_SIZE;

    const records = await this.orderModel.findAll({
      limit: PAGE_SIZE,
      offset,
    });

    const totalCount = await this.orderModel.count();

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return {
      records: records,
      pagination: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalCount: totalCount,
      },
    };
  }

  async findOne(id: number) {
    const order = await this.orderModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!order) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.orderModel.update(updateOrderDto, {
      where: { id },
    });

    if (!updatedOrder[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Updated', HttpStatus.OK);
  }

  async remove(id: number) {
    const deletedOrder = await this.orderModel.destroy({
      where: { id },
    });

    if (!deletedOrder) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Deleted', HttpStatus.OK);
  }

  async findByName(name: string, pageNumber: number) {
    const PAGE_SIZE = 10;
    const offset = (pageNumber - 1) * PAGE_SIZE;

    const records = await this.orderModel.findAll({
      where: { full_name: { [Op.iLike]: `%${name}%` } },
      limit: PAGE_SIZE,
      offset,
    });

    if (!records.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const totalCount = await this.orderModel.count({
      where: { full_name: { [Op.iLike]: `%${name}%` } },
    });

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return {
      records: records,
      pagination: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalCount: totalCount,
      },
    };
  }

  async findByOrderUniqueId(id: string) {
    const order = await this.orderModel.findOne({
      where: { order_unique_id: id },
    });

    if (!order) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async findByDate(fromToOrderSearchDto: FromToOrderSearchDto) {
    const { from, to } = fromToOrderSearchDto;

    //! Frontdan qanaqa Date kelishini so'reyman Muhammadidan

    const order = await this.orderModel.findOne({
      where: { createdAt: { [Op.between]: [from, to] } },
    });
    if (!order) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }
}
