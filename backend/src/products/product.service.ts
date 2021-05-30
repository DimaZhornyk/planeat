import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Product,
  ProductCategoriesType,
  productSchemaToType,
  Producttype,
  ProductType,
  productTypeSchemaToType,
} from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('products') private readonly model: Model<Product>,
    @InjectModel('producttypes') private readonly typeModel: Model<Producttype>,
  ) {}

  async findAll(): Promise<ProductType[]> {
    return (await this.model.find().populate('productType').exec()).map(
      productSchemaToType,
    );
  }

  async findAllTypes(): Promise<ProductCategoriesType[]> {
    return (await this.typeModel.find().exec()).map(productTypeSchemaToType);
  }
}
