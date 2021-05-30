import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'recipes', schema: RecipeSchema }]),
  ],
  providers: [RecipeResolver, RecipeService],
})
export class RecipeModule {}
