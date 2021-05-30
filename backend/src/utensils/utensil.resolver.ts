import { Query, Resolver } from '@nestjs/graphql';
import { UtensilType } from './utensil.dto';
import { UtensilService } from './utensil.service';

@Resolver((of) => UtensilType)
export class UtensilResolver {
  constructor(private readonly utensilService: UtensilService) {}
  @Query((returns) => [UtensilType])
  async utensils(): Promise<UtensilType[]> {
    return this.utensilService.findAll();
  }
}
