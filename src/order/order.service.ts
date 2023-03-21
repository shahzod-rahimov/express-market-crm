import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create({ ...createOrderDto });
  }

  findAll() {
    return this.orderModel.findAll({});
  }

  async findOne(id: number) {
    const order = await this.orderModel.findOne({ where: { id } });
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
}
