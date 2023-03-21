import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'status' })
export class Status extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;
}
