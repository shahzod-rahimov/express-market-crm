import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  @Column({ type: DataType.INTEGER })
  order_id: number;

  @ApiProperty({ example: '3', description: 'Status ID' })
  @Column({ type: DataType.INTEGER })
  status_id: number;

  @ApiProperty({ example: '2023-12-12', description: 'Operation date' })
  @Column({ type: DataType.DATE })
  operation_date: Date;

  @ApiProperty({ example: '4', description: 'Admin ID' })
  @Column({ type: DataType.INTEGER })
  admin_id: number;

  @ApiProperty({
    example: 'asdfjgksdjgkjjerdgsngkjdsnfkg',
    description: 'Operation description',
  })
  @Column({ type: DataType.TEXT })
  description: string;
}
