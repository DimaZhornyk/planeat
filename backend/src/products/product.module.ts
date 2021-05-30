import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, ProducttypeSchema } from './product.dto';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'products', schema: ProductSchema },
      { name: 'producttypes', schema: ProducttypeSchema },
    ]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
