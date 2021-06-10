import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, recipeSchemaToType, RecipeType } from './recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel('recipes') private readonly model: Model<Recipe>) { }

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

  async findByCaption(caption: string): Promise<RecipeType[]> {
    const res = await this.model
      .find()
      .populate('category')
      .populate('products')
      .populate('utensils')
      .exec();
    return res
      .filter(({ title }) => {
        if (title != undefined && title != null)
          return title.toLowerCase().includes(caption)
        return false
      })
      .map(recipeSchemaToType);
  }

  async findBySlug(slugName: string): Promise<RecipeType[]> {
    const res = await this.model
      .find()
      .populate('category')
      .populate('products')
      .populate('utensils')
      .exec();
    return res
      .filter(({ slug }) => slug === slugName)
      .map(recipeSchemaToType);
  }

  async findBySlugs(slugNames: string[]): Promise<RecipeType[]> {
    const res = await this.model
      .find()
      .populate('category')
      .populate('products')
      .populate('utensils')
      .exec();
    return res
      .filter(({ slug }) => slugNames.includes(slug))
      .map(recipeSchemaToType);
  }

  async findByCategoryProductUtensil(categoryName: string, productsName: string[], utensilsName: string[]): Promise<RecipeType[]> {
    const res = await this.model
      .find()
      .populate('category')
      .populate('products')
      .populate('utensils')
      .exec();
    return res
      .filter(({ category, products, utensils }) => {
        if (category.slug === categoryName) {
          let productFlag = productsName.length !== 0 ? products.map(it => it.slug).some(r => productsName.includes(r)) : true
          let utensilFlag = utensilsName.length !== 0 ? utensils.map(it => it.slug).some(r => utensilsName.includes(r)) : true

          return productFlag && utensilFlag
        }

        return false
      }
      )
      .map(recipeSchemaToType);
  }
}
