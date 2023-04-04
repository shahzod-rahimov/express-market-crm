import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CurrencyType } from '../../currency_type/entities/currency_type.entity';

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

  @ApiProperty({ example: '1000000', description: 'Product price' })
  @Column({ type: DataType.DECIMAL })
  summa: number;

  @ApiProperty({ example: '3', description: 'Currency ID' })
  @ForeignKey(() => CurrencyType)
  @Column({ type: DataType.INTEGER })
  currency_type_id: number;

  
  @ApiProperty({ example: 'ISUZU', description: 'Truck' })
  @Column({ type: DataType.STRING })
  truck: string;
  
  @ApiProperty({ example: 'qwergffdfgghghrtnjjxc', description: 'Description' })
  @Column({ type: DataType.TEXT })
  description: string;
  
  @BelongsTo(() => CurrencyType)
  currency_type: CurrencyType;
}
