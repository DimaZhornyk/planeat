import { AuthModule } from '@/auth/auth.module';
import { DbModule } from '@/db/db.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import UserRepository from './user.repository';
import { UserService } from './user.service';
import { UserGoogleService } from './userGoogle.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserGoogleService, UserRepository],
  imports: [DbModule, AuthModule]
})
export class UserModule {}
