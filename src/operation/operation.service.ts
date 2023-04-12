import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Order } from '../order/entities/order.entity';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation) private operationModel: typeof Operation,
    @InjectBot('akmal_express_bot') private readonly bot: Telegraf,
  ) {}

  async create(createOperationDto: CreateOperationDto) {
    if (+createOperationDto.status > 2) {
      throw new HttpException('Incorrect status', HttpStatus.BAD_REQUEST);
    }

    const isStatusExist = await this.operationModel.findOne({
      where: {
        status: createOperationDto.status,
        order_id: createOperationDto.order_id,
      },
    });

    if (isStatusExist) {
      throw new HttpException('Status already exists', HttpStatus.BAD_REQUEST);
    }

    const createdOperation = await this.operationModel
      .create({
        ...createOperationDto,
      })
      .then((operation) =>
        this.operationModel.findOne({
          where: { id: operation.id },
          include: [
            { model: Order },
            {
              model: Admin,
              attributes: { exclude: ['hashed_password', 'hashed_token'] },
            },
          ],
        }),
      );

    const date = createdOperation.dataValues.createdAt;

    if (createOperationDto.status === '0') {
      await this.bot.telegram.sendMessage(
        process.env.CHAT_ID,
        `<b>Yangi buyurtmani kutib oling!</b>\n\n📆 Qabul qilindi : ${date.toLocaleDateString(
          'uz-UZ',
        )} ${date.toLocaleTimeString('uz-UZ')}\n📦 Buyurtma : 🆔 #${
          createdOperation.dataValues.order.order_unique_id
        }\n💴 Buyurtma narxi: ${
          createdOperation.dataValues.order.summa
        }\n👤 Buyurtmachi: ${
          createdOperation.dataValues.order.full_name
        }\n📱 Tel: ${
          createdOperation.dataValues.order.phone_number
        }\n----------------------\n💴 Oldindan to'lov: ${
          createdOperation.dataValues.order.advance_payment
        }\n🔗 Buyurtma linki: <a href="${
          createdOperation.dataValues.order.product_link
        }">${
          createdOperation.dataValues.order.product_link
        }</a>\n\n😎 Qabul qildi: ${
          createdOperation.dataValues.admin.full_name
        }`,
        {
          parse_mode: 'HTML',
        },
      );
    }
    return createdOperation;
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
      where: { order_id: id },
    });

    if (!deletedOperation) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Deleted', HttpStatus.OK);
  }
}
