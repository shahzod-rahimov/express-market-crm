import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'admins', timestamps: false })
export class Admin extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Admin fullname' })
  @Column({ type: DataType.STRING })
  full_name: string;

  @ApiProperty({ example: 'johndoe', description: 'Admin username' })
  @Column({ type: DataType.STRING })
  user_name: string;

  @ApiProperty({ example: '1234567', description: 'Admin password' })
  @Column({ type: DataType.STRING })
  hashed_password: string;

  @ApiProperty({ example: '991234567', description: 'Admin phone number' })
  @Column({ type: DataType.STRING })
  phone_number: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'Admin email' })
  @Column({ type: DataType.STRING })
  email: string;

  @ApiProperty({
    example: 'https://t.me/johndoe',
    description: 'Admin telegram link',
  })
  @Column({ type: DataType.STRING })
  tg_link: string;

  @ApiProperty({ example: 'Admin', description: 'Admin refresh token' })
  @Column({ type: DataType.STRING })
  hashed_token: string;

  @ApiProperty({ example: 'true/false', description: 'Is Admin creator' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_creator: boolean;

  @ApiProperty({ example: 'true/false', description: 'Is Admin active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @ApiProperty({
    example: 'qwertyuiopasdfghjklzxcvbnm',
    description: 'Description',
  })
  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.DATE, defaultValue: new Date() })
  createdAt: Date;
}
