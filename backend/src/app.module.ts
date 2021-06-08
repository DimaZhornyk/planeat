import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './categories/categories.module';
import { ProductModule } from './products/product.module';
import { UtensilModule } from './utensils/utensil.module';
import { RecipeModule } from './recipes/recipe.module';
import { LoggerMiddleware } from "./util/logging.middleware";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
console.log({ MONGO_PASSWORD, MONGO_USERNAME });
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@planeat.f1hnx.mongodb.net`,
    ),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    CategoryModule,
    ProductModule,
    UtensilModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
