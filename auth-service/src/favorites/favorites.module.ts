import { AuthModule } from '@/auth/auth.module';
import { DbModule } from '@/db/db.module';
import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import FavoritesRepository from './favorites.repository';
import { FavoritesService } from './favorites.service';


@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  imports: [DbModule, AuthModule]
})
export class FavoritesModule {}