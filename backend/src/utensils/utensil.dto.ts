import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ObjectImage } from 'src/util/image';

export const UtensilSchema = new mongoose.Schema({
  title: String,
  slug: String,
  img: String,
  seoTitle: String,
});

export interface Utensil extends Document {
  readonly title: string;
  readonly slug: string;
  readonly img: string;
  readonly seoTitle: string;
}

export function utensilSchemaToType(u: Utensil): UtensilType {
  return {
    name: u.title,
    caption: u.slug,
    icon: { url: u.img },
    seoTitle: u.seoTitle,
    category: u.slug,
  };
}

@ObjectType()
export class UtensilType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly name: string;
  @Field()
  readonly category: string;
  @Field()
  readonly caption: string;
  @Field()
  readonly icon: ObjectImage;
  @Field()
  readonly seoTitle: string;
}
