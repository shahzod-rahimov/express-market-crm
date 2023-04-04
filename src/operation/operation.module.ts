import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Operation } from './entities/operation.entity';
import { Order } from '../order/entities/order.entity';
import { CurrencyType } from '../currency_type/entities/currency_type.entity';

@Module({
  imports: [SequelizeModule.forFeature([Operation, Order, CurrencyType])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
