import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'currency_types' })
export class CurrencyType extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'sum', description: 'Currency name' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({
    example: 'qwertytasdfgfdcxvcbngfretyujh',
    description: 'Currency description',
  })
  @Column({ type: DataType.TEXT })
  description: string;
}
