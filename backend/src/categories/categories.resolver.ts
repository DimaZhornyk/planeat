import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { mapLog } from 'src/util/util';
import { CategoryTextType, CategoryType } from './categories.dto';
import { CategoryService } from './categories.service';

@Resolver((of) => CategoryType)
export class CategoryResolver {
  private readonly logger = new Logger(CategoryResolver.name);
  constructor(private readonly categoryService: CategoryService) {}
  @Query((returns) => [CategoryType])
  async categories(): Promise<CategoryType[]> {
    return this.categoryService.findAll();
  }

  @Query((returns) => [CategoryTextType])
  async categoriesTexts(): Promise<CategoryTextType[]> {
    return mapLog(await this.categoryService.findAllText(), this.logger);
  }
}
