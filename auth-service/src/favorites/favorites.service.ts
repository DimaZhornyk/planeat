import { Injectable } from "@nestjs/common";
import FavoritesRepository from "./favorites.repository";

@Injectable()
export class FavoritesService {
  constructor(private readonly repo:FavoritesRepository){}

  public async createFavorite(userEmail:string, slug:string):Promise<any> {
    return this.repo.createFavorite(userEmail,slug)
  }
  public async readFavorites(userEmail:string):Promise<string[]>{
    return this.repo.readFavorites(userEmail)
  }

  public async deleteFavorite(userEmail:string, slug:string):Promise<any>{
    return this.repo.deleteFavorite(userEmail,slug)
  }
}