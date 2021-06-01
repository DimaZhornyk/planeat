import { ProviderId } from '@/providerIds';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import SessionService from './session.service';
const authProvider = {
  provide: ProviderId.AUTH,
  useClass: AuthService
};
const sessionProvider = {
  provide: ProviderId.SESSION,
  useClass: SessionService
};
@Module({
  controllers:[AuthController],
  providers: [authProvider, sessionProvider],
  exports: [authProvider, sessionProvider]
})
export class AuthModule {}
