import {
  ExecutionContext,
  createParamDecorator,
  SetMetadata
} from '@nestjs/common';
import { AuthRole } from './authRole.entity';

export const Roles = (...roles: AuthRole[]) => SetMetadata('roles', roles);

export const Role = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.role;
  }
);
