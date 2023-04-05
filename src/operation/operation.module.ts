import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Operation } from './entities/operation.entity';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [SequelizeModule.forFeature([Operation, Order])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
