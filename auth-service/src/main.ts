require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
const COOKIE_PARSER_SECRET = 'COOKIE_PARSER_SECRET';

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create(AppModule, { cors: { origin: true, credentials: true } });
  app.use(cookieParser(COOKIE_PARSER_SECRET));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );
  await app.listen(process.env.PORT, process.env.HOST);
  console.log({p:process.env.PORT, h:process.env.HOST})
}
bootstrap();
