import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtensilSchema } from './utensil.dto';
import { UtensilService } from './utensil.service';
import { UtensilResolver } from './utensil.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'utensils', schema: UtensilSchema }]),
  ],
  providers: [UtensilResolver, UtensilService],
})
export class UtensilModule {}
