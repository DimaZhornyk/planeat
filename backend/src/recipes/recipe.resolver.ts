import { Logger } from '@nestjs/common';
import {
  Args,
  ArgsType,
  Field,
  ID,
  InputType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { RecipeType } from './recipe.dto';
import { RecipeService } from './recipe.service';
@InputType()
export class RecipesWhere {
  @Field({ nullable: true })
  category?: string;

  @Field(() => [ID], { nullable: true })
  id?: [string];

  @Field({ nullable: true })
  recipeCaption?: string;

  @Field({ nullable: true })
  slug: string;

  @Field(() => [String], { nullable: true })
  slugs: string[]

  @Field(() => [String], { nullable: true })
  products?: string[];

  @Field(() => [String], { nullable: true })
  utensils?: string[];
}

@ArgsType()
export class GetRecipesArgs {
  @Field({ nullable: true })
  where?: RecipesWhere;
}

@Resolver((of) => RecipeType)
export class RecipeResolver {
  private readonly logger = new Logger(RecipeResolver.name);
  constructor(private readonly service: RecipeService) { }
  @Query((returns) => [RecipeType])
  async recipes(@Args() args: GetRecipesArgs): Promise<RecipeType[]> {
    if (args.where) {
      if (args.where.category) {
        if(args.where.products && args.where.utensils) {
          return await this.service.findByCategoryProductUtensil(args.where.category, args.where.products, args.where.utensils)
        }
        return await this.service.findByCategory(args.where.category);
      } else if (args.where.id) {
        return await this.service.findByIds(args.where.id);
      } else if (args.where.slugs) {
        return await this.service.findBySlugs(args.where.slugs)
      } else if (args.where.recipeCaption) {
        return await this.service.findByCaption(args.where.recipeCaption)
      } else if (args.where.slug) {
        return await this.service.findBySlug(args.where.slug)
      }
    }
    return this.service.findAll();
  }
}
