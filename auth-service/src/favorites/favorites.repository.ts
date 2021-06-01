import { tryCatchAsync } from "@/lib/fp/Either";
import { ProviderId } from "@/providerIds";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export default class FavoritesRepository {
  private readonly logger = new Logger(FavoritesRepository.name);
  constructor(@Inject(ProviderId.PG_POOL) private pool: Pool) {}

  public async createFavorite(userEmail:string, slug:string):Promise<any>{
    const qText = `insert into favorites(account_id, slug)
    select id as account_id,
      $1 as slug
    from account
    where email=$2;`;
    const res = await tryCatchAsync<Error,any>(()=>this.pool.query(qText,[slug,userEmail]))
    return res[0];
  }

  public async deleteFavorite(userEmail:string, slug:string):Promise<any>{
    const qText = `delete from favorites
    where slug=$1
      and account_id in (
        select id as account_id
        from account
        where email=$2
      );`;
    const res = await tryCatchAsync<Error,any>(()=>this.pool.query(qText,[slug,userEmail]))
    return res[0];
  }

  public async readFavorites(userEmail:string):Promise<string[]>{
    const qText = `select slug
    from favorites
    where account_id in (
        select id as account_id
        from account
        where email=$1
      );`;
    const res = await this.pool.query(qText,[userEmail])
    return res.rows.map(({slug})=>slug);
  }
  
}
