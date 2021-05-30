import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utensil, utensilSchemaToType, UtensilType } from './utensil.dto';

@Injectable()
export class UtensilService {
  constructor(
    @InjectModel('utensils') private readonly model: Model<Utensil>,
  ) {}

  async findAll(): Promise<UtensilType[]> {
    return (await this.model.find().exec()).map(utensilSchemaToType);
  }
}
