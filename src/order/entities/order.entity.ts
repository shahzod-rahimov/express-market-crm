import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Operation } from '../../operation/entities/operation.entity';

@Table({ tableName: 'orders' })
export class Order extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2', description: 'Order unique ID' })
  @Column({ type: DataType.STRING })
  order_unique_id: string;

  @ApiProperty({ example: 'John Doe', description: 'Customer fullname' })
  @Column({ type: DataType.STRING })
  full_name: string;

  @ApiProperty({ example: '991234567', description: 'Customer phone number' })
  @Column({ type: DataType.STRING })
  phone_number: string;

  @ApiProperty({
    example: 'https://akmalexpress/phone/1',
    description: 'Product link',
  })
  @Column({ type: DataType.STRING })
  product_link: string;

  @ApiProperty({ example: '1000000', description: 'Product advance payment' })
  @Column({ type: DataType.DECIMAL })
  advance_payment: number;

  @ApiProperty({ example: '1000000', description: 'Product price' })
  @Column({ type: DataType.DECIMAL })
  summa: number;

  @ApiProperty({ example: 'qwergffdfgghghrtnjjxc', description: 'Description' })
  @Column({ type: DataType.TEXT })
  description: string;

  @HasMany(() => Operation)
  operation: Operation[];
}
