import AuthService, { JwtCreds } from '@/auth/auth.service';
import { ProviderId } from '@/providerIds';
import { AuthProvider } from '@/auth/auth.constants';
import {
  Controller,
  Post,
  Res,
  Body,
  Logger,
  UseGuards,
  Inject,
  Patch,
  Request
} from '@nestjs/common';
import { AuthGuard, Creds } from '@/auth/auth.guard';
import { Response } from 'express';
import User from './user.entity';
import { USER_ALREADY_EXISTS } from './user.error';
import { UserService } from './user.service';
import { AuthRole } from '@/auth/authRole.entity';
import { Maybe, maybeof } from '@/lib/fp/Maybe';
import SessionService from '@/auth/session.service';
import { UserGoogleService } from './userGoogle.service';
type Creds = JwtCreds & { password: string };
type SignInResponse = { login: string; role: string };
const maybeUserToJwtCreds = (
  m: Maybe<{ u: User; role: AuthRole }>
): Maybe<JwtCreds> => {
  return m.map(({ u, role }) => ({
    email: u.email,
    login: u.login,
    role
  }));
};
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly userGoogleService: UserGoogleService,
    @Inject(ProviderId.AUTH) private readonly auth: AuthService,
    @Inject(ProviderId.SESSION) private readonly sessionService: SessionService
  ) {}

  private async authenticate(
    response: Response,
    creds: Creds,
    password_hash: string
  ) {
    return (
      await this.auth.authorize({ ...creds }, password_hash)
    ).mapAsync<boolean>(this.applyAuthentication(response, creds));
  }

  private applyAuthentication(response: Response, creds: Creds) {
    return async (token: string) => {
      const sessionId = await this.sessionService.createSession(creds);
      this.applyToken(response, token, sessionId);
      return true;
    };
  }

  private async applyToken(
    response: Response,
    token: string,
    refreshToken: string
  ) {
    response.cookie('token', token, {
      //httpOnly: true,
      //signed: true
    });
    response.cookie('refreshToken', refreshToken);
  }

  @Post('sign_in')
  public async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() creds: { email: string; password: string }
  ): Promise<User | null> {
    const res = (await this.userService.getUser(creds.email))
      .flatMapAsync<User>(async ({ u, password_hash, role }) =>
        //prettier-ignore
        (await this.authenticate(
            response,
            { ...u, password: creds.password, role },
            password_hash))
        .map((res) => ({...u,role}))
      )
      .then((u) =>
        u.getOrElse(() => {
          response.sendStatus(401);
          return null;
        })
      );
    return res;
  }

  @Post('refresh')
  public async refresh(
    @Request() req,
    @Res({ passthrough: true }) response: Response
  ): Promise<string> {
    //prettier-ignore
    const res = (await this.sessionService.getCreds(req.cookies.refreshToken))
    .map(([id, creds]) =>
      {
        this.applyToken(response, this.auth.createJwt(creds), id);
        return "OK"
      }
    )
    .getOrElse(()=>{response.sendStatus(401); return null});
    return res;
  }

  private async createGoogleUserAndAthenticate(
    creds: JwtCreds,
    response: Response
  ): Promise<[Error, JwtCreds]> {
    const [err, newCreds] = await this.userGoogleService.createGoogleUser(
      creds.login,

      creds.email,
      creds.role
    );
    if (err != null) {
      return [err, null];
    }
    const applyToken = this.applyAuthentication(response, {
      ...creds,
      password: ''
    });
    const token = this.auth.createJwt(creds);
    await applyToken(token);
    return [null, creds];
  }

  @Post('sign_in_google')
  public async signInGoogle(
    @Res({ passthrough: true }) response: Response,
    @Body() body: { token: string }
  ): Promise<SignInResponse> {
    const [err, tokenPayload] = await this.auth.verifyGoogleJwt(body.token);
    if (err != null) {
      this.logger.debug(err.name);
      response.sendStatus(403);
      return null;
    }
    const { email, name } = tokenPayload;

    // create user if not exists.
    const maybeUser = await this.userService.getUser(email);
    const creds: JwtCreds = await (await maybeUserToJwtCreds(maybeUser)
    .mapPromise(async (creds)=>{
      const applyToken = this.applyAuthentication(response, {
        ...creds,
        password: ''
      });
      const token = this.auth.createJwt(creds);
      await applyToken(token);
      return creds
    }))
    .getOrElseAsync(
      async () => {
        const creds = { email, login: name, role: AuthRole.USER };
        const [err, applied] = await this.createGoogleUserAndAthenticate(
          creds,
          response
        );
        if (err != null) {
          this.logger.debug(err);
          response.sendStatus(400);
          return { login: null, email: null, role: null };
        }
        return applied;
      }
    );
    return creds;
  }

  @Post('sign_up')
  public async create(
    @Res({ passthrough: true }) response: Response,
    @Body() creds: { login: string; email: string; password: string }
  ): Promise<string> {
    const passwordHash = await this.auth.createHash(creds.password);
    const err = await this.userService.createUser(
      { login: creds.login, email: creds.email },
      { passwordHash, authProvider: null },
      AuthRole.USER
    );
    if (err != null) {
      this.logger.debug(err.message);
      if (err === USER_ALREADY_EXISTS) {
        response.sendStatus(409);
      } else {
        response.sendStatus(400);
      }
      return null;
    }
    return 'OK';
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  async update(
    @Res({ passthrough: true }) res: Response,
    @Body()
    user: {
      email: string;
      login: string | null;
      newEmail: string | null;
      password: string | null;
      authProvider: string | null;
    },
    @Creds() creds: JwtCreds
  ): Promise<boolean> {
    this.logger.debug({ creds });
    if (creds.email !== user.email) {
      res.sendStatus(401);
    }
    const passwordHash = await maybeof(user.password)
      .mapAsync((p) => this.auth.createHash(p))
      .inner();
    const email = user.newEmail ?? creds.email;
    const login = user.login ?? creds.login;
    const authProvider = user.authProvider;
    const updateSuccess = await this.userService.updateUser(user.email, {
      email,
      login,
      passwordHash,
      authProvider
    });
    if (!updateSuccess) {
      res.sendStatus(400);
    }
    return updateSuccess;
  }

  @Post('test_auth')
  @UseGuards(AuthGuard)
  public async testAuth(
    @Res({ passthrough: true }) response: Response,
    @Creds() creds: Creds
  ): Promise<Creds> {
    this.logger.debug(creds);
    return creds;
  }
}
