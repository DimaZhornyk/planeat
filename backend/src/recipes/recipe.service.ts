import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, recipeSchemaToType, RecipeType } from './recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel('recipes') private readonly model: Model<Recipe>) {}

  async findAll(): Promise<RecipeType[]> {
    return (
      await this.model
        .find()
        .populate('category')
        .populate('products')
        .populate('utensils')
        .exec()
    ).map(recipeSchemaToType);
  }

  async findByCategory(categoryName: string): Promise<RecipeType[]> {
    const res = await this.model
      .find()
      .populate('category')
      .populate('products')
      .populate('utensils')
      .exec();
    return res
      .filter(({ category }) => category.slug === categoryName)
      .map(recipeSchemaToType);
  }

  async findByIds(ids: string[]): Promise<RecipeType[]> {
    const res = await this.model
      .find()
      .populate('category')
      .populate('products')
      .populate('utensils')
      .exec();
    return res
      .filter(({ category }) => ids.includes(category.id))
      .map(recipeSchemaToType);
  }
}
