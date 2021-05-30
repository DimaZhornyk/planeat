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
import { mapLog } from 'src/util/util';
import { RecipeType } from './recipe.dto';
import { RecipeService } from './recipe.service';
@InputType()
export class RecipesWhere {
  @Field()
  category?: string;

  @Field(() => [ID])
  id?: [string];
}

@ArgsType()
export class GetRecipesArgs {
  @Field({ nullable: true })
  where?: RecipesWhere;
}

@Resolver((of) => RecipeType)
export class RecipeResolver {
  private readonly logger = new Logger(RecipeResolver.name);
  constructor(private readonly service: RecipeService) {}
  @Query((returns) => [RecipeType])
  async recipes(@Args() args: GetRecipesArgs): Promise<RecipeType[]> {
    if (args.where) {
      if (args.where.category) {
        return await this.service.findByCategory(args.where.category);
      } else if (args.where.id) {
        return await this.service.findByIds(args.where.id);
      }
    }
    return this.service.findAll();
  }
}
