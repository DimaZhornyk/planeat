import { AuthGuard, Creds } from "@/auth/auth.guard";
import { JwtCreds } from "@/auth/auth.service";
import { Roles } from "@/auth/authRole.decorator";
import { AuthRole } from "@/auth/authRole.entity";
import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";

@Controller('/favorites')
export class FavoritesController {
  constructor(private readonly service:FavoritesService){}
  
  @UseGuards(AuthGuard)
  @Roles(AuthRole.USER)
  @Get('/')
  public async read(
    @Creds() creds: JwtCreds
  ){
    return await this.service.readFavorites(creds.email);
  }

  @UseGuards(AuthGuard)
  @Roles(AuthRole.USER)
  @Post('/')
  public async create(
    @Body() body:{slug:string},
    @Creds() creds: JwtCreds
  ){
    return await this.service.createFavorite(creds.email,body.slug);
  }

  @UseGuards(AuthGuard)
  @Roles(AuthRole.USER)
  @Delete('/')
  public async delete(
    @Body() body:{slug:string},
    @Creds() creds: JwtCreds
  ){
    return await this.service.deleteFavorite(creds.email,body.slug)
  }
}