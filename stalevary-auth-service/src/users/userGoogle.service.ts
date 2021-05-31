import { JwtCreds } from '@/auth/auth.service';
import { Logger, Injectable, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserGoogleService {
  private readonly logger = new Logger(UserGoogleService.name);
  constructor(private readonly userService: UserService) {}

  public async createGoogleUser(
    login,
    email,
    role
  ): Promise<[Error, JwtCreds]> {
    const creds: JwtCreds = { login, email, role };
    return [
      await this.userService.createGoogleUser(
        creds.email,
        creds.login,
        creds.role
      ),
      creds
    ];
  }
}
