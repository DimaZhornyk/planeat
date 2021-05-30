import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: String,
  slug: String,
  img: String,
  description: String,
  headerText: String,
  seoText: String,
});

export interface Category extends Document {
  readonly _id: mongoose.Types.ObjectId;
  readonly title: string;
  readonly slug: string;
  readonly img: string;
  readonly description: string;
  readonly headerText: string;
  readonly seoText: string;
}

@ObjectType()
export class CategoryImage {
  @Field()
  readonly url: string;
}

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly categoryName: string;
  @Field()
  readonly categoryDisplayNameUA: string;
  @Field()
  readonly categoryImage: CategoryImage;
}

export function categorySchemaToTextType(c: Category): CategoryTextType {
  return {
    CategoryNameText: c.slug,
    CategoryText: c.seoText,
    CategoryH1: c.headerText,
    CategoryTitle: c.title,
    CategoryDescription: c.description,
  };
}

@ObjectType()
export class CategoryTextType {
  @Field()
  CategoryNameText: string;
  @Field()
  CategoryText: string;
  @Field()
  CategoryH1: string;
  @Field()
  CategoryTitle: string;
  @Field()
  CategoryDescription: string;
}
