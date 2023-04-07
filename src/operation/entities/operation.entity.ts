import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/entities/order.entity';
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

  @ApiProperty({
    example: '[0 - new, 1 - waited, 2 - end] default - 0',
    description: '[0 - new, 1 - waited, 2 - end] default - 0',
  })
  @Column({ type: DataType.STRING, defaultValue: '0' })
  status: string;

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
