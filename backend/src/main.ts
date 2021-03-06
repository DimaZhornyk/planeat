require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(5000);
}
bootstrap();
