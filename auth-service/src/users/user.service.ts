import { Logger, Injectable, Inject } from '@nestjs/common';
import User from './user.entity';
import UserRepository from './user.repository';
import { Maybe } from '@/lib/fp/Maybe';
import { mapDebug } from '@/lib/fp/fun';
import { AuthRole } from '@/auth/authRole.entity';
import { AuthProvider } from '@/auth/auth.constants';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  private readonly users: User[] = [];
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly repository: UserRepository) {}

  public async getUser(
    email: string
  ): Promise<Maybe<{ u: User; password_hash: string; role: AuthRole }>> {
    return this.repository.getUser(email);
  }

  public async createUser(
    u: { email: string; login: string },
    auth: { passwordHash: string | null; authProvider: string | null },
    role: AuthRole
  ): Promise<Error> {
    return await this.repository.createUser(u, auth, role);
  }

  public async createGoogleUser(
    email: string,
    login: string,
    role: AuthRole
  ): Promise<Error> {
    return await this.createUser(
      { email, login },
      { passwordHash: null, authProvider: AuthProvider.GOOGLE },
      role
    );
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
    return this.repository.updateUser(email, u);
  }
}
