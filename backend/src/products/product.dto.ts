import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ObjectImage } from 'src/util/image';

export const ProductSchema = new mongoose.Schema({
  title: String,
  slug: String,
  seoTitle: String,
  productType: { type: mongoose.Schema.Types.ObjectId, ref: 'producttypes' },
  img: String,
});

export const ProducttypeSchema = new mongoose.Schema({
  slug: String,
  title: String,
});

export interface Producttype extends Document {
  readonly slug: string;
  readonly title: string;
}

export interface Product extends Document {
  readonly title: string;
  readonly slug: number;
  readonly seoTitle: string;
  readonly img: string;
  readonly productType: Producttype;
}

export function productSchemaToType(p: Product): ProductType {
  return {
    name: p.title,
    caption: p.title,
    icon: { url: p.img },
    category: p.productType.slug,
    seoTitle: p.seoTitle,
  };
}

export function productTypeSchemaToType(p: Producttype): ProductCategoriesType {
  return {
    categoryName: p.slug,
    categoryDisplayNameUA: p.title,
  };
}

@ObjectType()
export class ProductType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly name: string;
  @Field()
  readonly caption: string;
  @Field()
  readonly icon: ObjectImage;
  @Field()
  readonly category: string;
  @Field()
  readonly seoTitle: string;
}

@ObjectType()
export class ProductCategoriesType {
  @Field()
  categoryName: string;
  @Field()
  categoryDisplayNameUA: string;
}
