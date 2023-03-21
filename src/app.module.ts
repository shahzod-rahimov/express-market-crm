import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { OperationModule } from './operation/operation.module';
import { StatusModule } from './status/status.module';
import { CurrencyTypeModule } from './currency_type/currency_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    OrderModule,
    OperationModule,
    StatusModule,
    CurrencyTypeModule,
  ],
})
export class AppModule {}
