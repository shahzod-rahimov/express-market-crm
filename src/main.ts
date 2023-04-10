import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Admin } from './admin/entities/admin.entity';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  const hasAdmin = await Admin.findAll({});

  if (!hasAdmin.length) {
    const password = await bcrypt.hash('1234567', 7);
    Admin.create({
      full_name: 'Kotta bolla',
      user_name: 'admin',
      hashed_password: password,
      is_creator: true,
      is_active: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('AkmalExpress CRM')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('NodeJS, NestJS, Postgres, Sequalize')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
