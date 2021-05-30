import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  categorySchemaToTextType,
  CategoryTextType,
  CategoryType,
} from './categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('categories') private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<CategoryType[]> {
    return (await this.categoryModel.find().exec()).map(
      ({ _id, slug, title, img }) => ({
        id: _id.toHexString(),
        categoryName: slug,
        categoryDisplayNameUA: title,
        categoryImage: { url: img },
      }),
    );
  }

  async findAllText(): Promise<CategoryTextType[]> {
    return (await this.categoryModel.find().exec()).map(
      categorySchemaToTextType,
    );
  }
}
