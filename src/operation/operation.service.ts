import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation) private operationModel: typeof Operation,
  ) {}

  async create(createOperationDto: CreateOperationDto) {
    const operation = await this.operationModel.create({
      ...createOperationDto,
    });
    const result = await this.operationModel.findOne({
      where: { id: operation.id },
      attributes: { exclude: ['admin_id', 'order_id'] },
      include: [
        { model: Order },
        {
          model: Admin,
          attributes: { exclude: ['hashed_password', 'hashed_token'] },
        },
      ],
    });
    return result;
  }

  async findAll() {
    return this.operationModel.findAll({
      attributes: { exclude: ['order_id', 'admin_id'] },
      include: [
        { model: Order },
        {
          model: Admin,
          attributes: { exclude: ['hashed_password', 'hashed_token'] },
        },
      ],
    });
  }

  async findOne(id: number) {
    const operation = await this.operationModel.findOne({
      where: { id },
      attributes: { exclude: ['order_id', 'admin_id'] },
      include: [
        { model: Order },
        {
          model: Admin,
          attributes: { exclude: ['hashed_password', 'hashed_token'] },
        },
      ],
    });
    if (!operation) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return operation;
  }

  async update(id: number, updateOperationDto: UpdateOperationDto) {
    const updatedOperation = await this.operationModel.update(
      updateOperationDto,
      {
        where: { id },
      },
    );

    if (!updatedOperation[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Updated', HttpStatus.OK);
  }

  async remove(id: number) {
    const deletedOperation = await this.operationModel.destroy({
      where: { id },
    });

    if (!deletedOperation) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Deleted', HttpStatus.OK);
  }
}
