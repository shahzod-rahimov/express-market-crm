import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/entities/order.entity';
import { CurrencyType } from '../../currency_type/entities/currency_type.entity';
import { Status } from '../../status/entities/status.entity';
import { Admin } from '../../admin/entities/admin.entity';

@Table({ tableName: 'operations' })
export class Operation extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2', description: 'Order ID' })
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order[];

  @ApiProperty({ example: '3', description: 'Status ID' })
  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER })
  status_id: number;

  @BelongsTo(() => Status)
  status: Status;

  @ApiProperty({ example: '2023-12-12', description: 'Operation date' })
  @Column({ type: DataType.DATE })
  operation_date: Date;

  @ApiProperty({ example: '4', description: 'Admin ID' })
  @ForeignKey(() => Admin)
  @Column({ type: DataType.INTEGER })
  admin_id: number;

  @BelongsTo(() => Admin)
  admin: Admin;

  @ApiProperty({
    example: 'asdfjgksdjgkjjerdgsngkjdsnfkg',
    description: 'Operation description',
  })
  @Column({ type: DataType.TEXT })
  description: string;
}
