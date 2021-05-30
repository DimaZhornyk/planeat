import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ObjectImage {
  @Field()
  url: string;
}
