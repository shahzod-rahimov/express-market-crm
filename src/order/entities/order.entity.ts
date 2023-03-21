import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'orders' })
export class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  order_unique_id: number;

  @Column({ type: DataType.STRING })
  full_name: string;

  @Column({ type: DataType.STRING })
  phone_number: string;

  @Column({ type: DataType.STRING })
  product_link: string;

  @Column({ type: DataType.DECIMAL })
  summa: number;

  @Column({ type: DataType.INTEGER })
  currency_type_id: number;

  @Column({ type: DataType.STRING })
  truck: string;

  @Column({ type: DataType.TEXT })
  description: string;
}
