import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './categories.dto';
import { CategoryService } from './categories.service';
import { CategoryResolver } from './categories.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'categories', schema: CategorySchema }]),
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
