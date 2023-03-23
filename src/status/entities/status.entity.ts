import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'status' })
export class Status extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'active', description: 'Status name' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({
    example: 'asdfgggfdsfggdnmfkjrhgjdfncnvdfkdnj',
    description: 'Status description',
  })
  @Column({ type: DataType.TEXT })
  description: string;
}
