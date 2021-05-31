import { Injectable, Inject, Logger } from '@nestjs/common';
import { ProviderId } from '@/providerIds';
import { Pool } from 'pg';
import User from './user.entity';
import { Maybe, maybeof } from '@fp/Maybe';
import { transactionOf } from '@/db/transaction';
import { mapDebug } from '@/lib/fp/fun';
import { USER_ALREADY_EXISTS } from './user.error';
import { filterSkip, skip } from '@/lib/array/utils';
import { AuthRole } from '@/auth/authRole.entity';
type AccountRow = {
  login: string;
  email: string;
  password_hash: string;
  role: AuthRole;
};

@Injectable()
export default class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(@Inject(ProviderId.PG_POOL) private pool: Pool) {}

  //prettier-ignore
  public async getUser(
    email: string
  ): Promise<Maybe<{ u: User; password_hash: string; role: AuthRole }>> {
    return maybeof<AccountRow>(
      (await this.pool.query('SELECT * FROM account acc JOIN auth on acc.id=auth.account_id WHERE email=$1;', [email]))
        .rows[0]
    ).map((a) => {
      return {
        u: new User(a.login, a.email),
        password_hash: a.password_hash,
        role: a.role
      };
    });
  }

  public async updateUser(
    email: string,
    u: {
      email: string;
      login: string;
      passwordHash: string | null;
      authProvider: string | null;
    }
  ): Promise<boolean> {
    const run = await transactionOf<string>(this.pool);
    const [err, res] = await run(async (c) => {
      this.logger.debug({ email, u });
      const accUpdateQuery =
        'UPDATE account SET login=$1, email=$2 WHERE email=$3 RETURNING id;';
      const accUpdateRes = (
        await c.query(accUpdateQuery, [u.login, u.email, email])
      ).rows[0].id;
      const authUpdateQuery = `UPDATE auth SET ${
        u.passwordHash != null ? 'password_hash=$3,' : ''
      } auth_provider=$1 WHERE account_id=$2;`;
      this.logger.debug(
        filterSkip([u.authProvider, accUpdateRes, u.passwordHash ?? skip()])
          .length
      );
      const authUpdateRes = await c.query(
        authUpdateQuery,
        filterSkip([u.authProvider, accUpdateRes, u.passwordHash ?? skip()])
      );
      return 'OK';
    });
    if (err != null) {
      this.logger.debug(err);
      return false;
    }
    return true;
  }

  public async createUser(
    u: { email: string; login: string },
    auth: { passwordHash: string | null; authProvider: string | null },
    role: AuthRole
  ): Promise<Error> {
    const transaction = transactionOf<number>(this.pool);
    const [err, id] = await transaction(async (c) => {
      const accCreateQuery =
        'INSERT INTO account(login, email) VALUES($1,$2) RETURNING id;';
      const id = (await c.query(accCreateQuery, [u.login, u.email])).rows[0].id;
      const authCreateQuery =
        'INSERT INTO auth(password_hash, auth_provider, account_id, role) VALUES($1, $2, $3, $4);';
      await c.query(authCreateQuery, [
        auth.passwordHash,
        auth.authProvider,
        id,
        role
      ]);
      return id;
    });
    if (err != null) {
      if (
        err.message ===
        `duplicate key value violates unique constraint "account_email_key"`
      ) {
        return USER_ALREADY_EXISTS;
      }
    }
    return null;
  }
}
