import { Query, Resolver } from '@nestjs/graphql';
import { ProductCategoriesType, ProductType } from './product.dto';
import { ProductService } from './product.service';

@Resolver((of) => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  @Query((returns) => [ProductType])
  async products(): Promise<ProductType[]> {
    return this.productService.findAll();
  }

  @Query((returns) => [ProductCategoriesType])
  async categoriesProducts(): Promise<ProductCategoriesType[]> {
    return this.productService.findAllTypes();
  }
}
