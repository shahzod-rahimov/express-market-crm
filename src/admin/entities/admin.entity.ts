import { Column, DataType, Table , Model} from 'sequelize-typescript';

@Table({ tableName: 'admins' })
export class Admin extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  full_name: string;

  @Column({ type: DataType.STRING })
  user_name: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.STRING })
  phone_number: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  tg_link: string;

  @Column({ type: DataType.STRING })
  hashed_token: string;

  @Column({ type: DataType.BOOLEAN })
  is_creator: boolean;

  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;

  @Column({ type: DataType.TEXT })
  description: string;
}
