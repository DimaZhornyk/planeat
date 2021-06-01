import { set } from '@/lib/obj/utils';
import { ProviderId } from '@/providerIds';
import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import AuthService, { JwtCreds } from './auth.service';
import { AuthRole } from './authRole.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    @Inject(ProviderId.AUTH) private readonly authService: AuthService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AuthRole[]>('roles', context.getHandler());

    const request: Request = context.switchToHttp().getRequest();
    const token: string = request.cookies.token;
    this.logger.log(`token: ${token}`);
    //prettier-ignore
    const [err,creds] = await this.authService.verifyJwt(token);
    if (err != null) {
      this.logger.debug(err);
      return !roles || false;
    }
    this.logger.debug(creds);
    request.params['creds'] = JSON.stringify(creds);
    set(request, 'role', creds.role);
    return roles ? roles.includes(creds.role) : true;
  }
}

export const Creds = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): JwtCreds => {
    const request = ctx.switchToHttp().getRequest();
    const creds = request.params['creds'] ? JSON.parse(request.params['creds']) :{email:"UNAUTHORIZED", login:"UNAUTHORIZED", role:AuthRole.NONE}
    return creds as JwtCreds;
  }
);
