import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/categories/categories.dto';
import { ObjectImage } from 'src/util/image';
import {
  Product,
  productSchemaToType,
  ProductType,
} from 'src/products/product.dto';
import {
  Utensil,
  utensilSchemaToType,
  UtensilType,
} from 'src/utensils/utensil.dto';

export const RecipeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  slug: String,
  img: String,
  calories: Number,
  minutesToCook: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  utensils: [{ type: mongoose.Schema.Types.ObjectId, ref: 'utensils' }],
});

export interface Recipe extends Document {
  readonly _id: string;
  readonly title: string;
  readonly slug: string;
  readonly img: string;
  readonly category: Category;
  readonly calories: number;
  readonly minutesToCook: number;
  readonly products: Product[];
  readonly utensils: Utensil[];
}

export function recipeSchemaToType(r: Recipe): RecipeType {
  const res: RecipeType = {
    id: r._id,
    slug: r.slug,
    calories: r.calories,
    time: r.minutesToCook,
    recipeImage: { url: r.img },
    category: r.category.slug,
    products: r.products.map(productSchemaToType),
    utensils: r.utensils.map(utensilSchemaToType),
  };
  return res;
}

@ObjectType()
export class RecipeType {
  @Field(() => ID)
  readonly id?: string;

  @Field()
  readonly slug: string;

  @Field()
  readonly calories: number;

  @Field()
  readonly time: number;

  @Field()
  readonly recipeImage: ObjectImage;

  @Field()
  readonly category: string;

  @Field((type) => [ProductType])
  readonly products: ProductType[];

  @Field((type) => [UtensilType])
  readonly utensils: UtensilType[];
}
