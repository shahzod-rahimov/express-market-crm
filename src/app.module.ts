import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { OperationModule } from './operation/operation.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { TelegrafModule } from 'nestjs-telegraf';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    TelegrafModule.forRootAsync({
      botName: 'akmal_express_bot',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [],
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      logging: false,
      synchronize: true,
    }),
    AdminModule,
    OrderModule,
    OperationModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
