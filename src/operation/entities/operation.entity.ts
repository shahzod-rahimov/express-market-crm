import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'operations' })
export class Operation extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  order_id: number;

  @Column({ type: DataType.INTEGER })
  status_id: number;

  @Column({ type: DataType.DATE })
  operation_date: Date;

  @Column({ type: DataType.INTEGER })
  admin_id: number;

  @Column({ type: DataType.TEXT })
  description: string;
}
