import { Maybe, maybeof } from '@/lib/fp/Maybe';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { promisify } from '@fp/fun';
import { AuthRole } from './authRole.entity';
import { tryCatchAsync } from '@fp/Either';
import { PRIVATE_RSA, PUBLIC_RSA } from './auth.constants';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export type JwtCreds = { email: string; login: string; role: AuthRole };
const verifyJwtAsync = promisify(verify);
@Injectable()
export default class AuthService {
  private readonly SALT_ROUNDS = 10;
  private readonly logger = new Logger(AuthService.name);
  private readonly client = new OAuth2Client(CLIENT_ID);
  public async authorize(
    creds: { email: string; login: string; role: AuthRole; password: string },
    password_hash: string
  ): Promise<Maybe<string>> {
    return (await this.verifyPassword(creds.password, password_hash))
      ? maybeof(await this.createJwt(creds))
      : maybeof(null);
  }
  public createJwt(
    creds: JwtCreds,
    expiresAt: number = Math.round(Date.now() / 1000) + 60000
  ): string {
    this.logger.debug(expiresAt);
    this.logger.debug(creds);
    this.logger.debug(PRIVATE_RSA)
    return sign({ ...creds, exp: expiresAt }, {key:PRIVATE_RSA,passphrase:'passphrase'} , { algorithm: 'RS256' });
  }
  public async createHash(data: string): Promise<string> {
    return bcrypt.hash(data, this.SALT_ROUNDS);
  }

  public async verifyJwt(token: string): Promise<[Error, JwtCreds]> {
    return tryCatchAsync<Error, JwtCreds>(
      async () => (await verifyJwtAsync(token, PUBLIC_RSA)) as JwtCreds
    );
  }

  public async verifyPassword(
    password: string,
    password_hash: string
  ): Promise<boolean> {
    let res = await bcrypt.compare(password, password_hash);
    return res;
  }

  public async verifyGoogleJwt(token: string): Promise<[Error, TokenPayload]> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
      });
      const payload = ticket.getPayload();
      return [null, payload];
    } catch (e) {
      return [e, null];
    }
  }
}
