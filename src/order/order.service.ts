import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Op } from 'sequelize';
import { FromToOrderSearchDto } from './dto/from-to-order-date-search.dto';
import { Operation } from '../operation/entities/operation.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  getUniqueID(id: number) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const length = letters.length;

    return `${letters[this.getRandomNumber(length)]}${
      letters[this.getRandomNumber(length)]
    }${1000 + id}`;
  }

  getRandomNumber(num: number) {
    return Math.floor(Math.random() * num);
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderModel.create({ ...createOrderDto });

    order.order_unique_id = this.getUniqueID(order.id);

    await order.save();
    return order;
  }

  async findAll(pageNumber: number) {
    const PAGE_SIZE = 10;
    const offset = (pageNumber - 1) * PAGE_SIZE;

    const records = await this.orderModel.findAll({
      limit: PAGE_SIZE,
      offset: offset,
      order: [['createdAt', 'DESC']],
      include: {
        model: Operation,
        attributes: { exclude: ['order_id'] },
        include: [
          {
            model: Admin,
            attributes: { exclude: ['hashed_password', 'hashed_token'] },
          },
        ],
      },
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
      include: {
        model: Operation,
        attributes: { exclude: ['order_id'] },
        include: [
          {
            model: Admin,
            attributes: { exclude: ['hashed_password', 'hashed_token'] },
          },
        ],
      },
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
      order: [['createdAt', 'DESC']],
      include: {
        model: Operation,
        attributes: { exclude: ['order_id'] },
        include: [
          {
            model: Admin,
            attributes: { exclude: ['hashed_password', 'hashed_token'] },
          },
        ],
      },
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
    const order = await this.orderModel.findAll({
      where: { order_unique_id: { [Op.startsWith]: `${id}` } },
      include: {
        model: Operation,
        attributes: { exclude: ['admin_id', 'order_id'] },
        include: [
          {
            model: Admin,
            attributes: { exclude: ['hashed_password', 'hashed_token'] },
          },
        ],
      },
    });

    if (!order.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async findByDate(
    fromToOrderSearchDto: FromToOrderSearchDto,
    pageNumber: number,
  ) {
    const { from, to } = fromToOrderSearchDto;

    const PAGE_SIZE = 10;
    const offset = (pageNumber - 1) * PAGE_SIZE;

    const order = await this.orderModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [from, to],
        },
      },
      limit: PAGE_SIZE,
      offset,
      order: [['createdAt', 'DESC']],
      include: {
        model: Operation,
        attributes: { exclude: ['admin_id', 'order_id'] },
        include: [
          {
            model: Admin,
            attributes: { exclude: ['hashed_password', 'hashed_token'] },
          },
        ],
      },
    });

    if (!order.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const totalCount = await this.orderModel.count({
      where: { createdAt: { [Op.between]: [from, to] } },
    });

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return {
      records: order,
      pagination: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalCount: totalCount,
      },
    };
  }

  async findOrderOperation(status: string, pageNumber: number) {
    const pageSize = 10;
    const orders = await this.orderModel
      .findAll({
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        order: [['createdAt', 'DESC']],
        include: {
          model: Operation,
          limit: 1,
          attributes: { exclude: ['order_id'] },
          order: [['id', 'DESC']],
          include: [
            {
              model: Admin,
              attributes: { exclude: ['hashed_password', 'hashed_token'] },
            },
          ],
        },
      })
      .then((orders) => {
        const filtered = orders.filter((order) => {
          const operation = order.operation;
          return operation[operation.length - 1].status == status;
        });

        return filtered;
      });

    return orders;
  }

  dayMonth(date) {
    var dateObj = new Date(date);
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    return month + '/' + day;
  }
  addDays(date, days = -1) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  async statistikaOrder(date) {
    try {
      console.log(new Date(this.addDays(date)));
      let result = { days: [], order: [] };
      for (let i = 0; i < 30; i++) {
        const resl = await this.orderModel.findAll({
          where: {
            createdAt: {
              [Op.between]: [new Date(this.addDays(date)), new Date(date)],
            },
          },
        });
        result.days.push(this.dayMonth(date));
        result.order.push(resl.length);
        date = this.addDays(date);
      }
      result.days.reverse();
      result.order.reverse();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
