import { AuthModule } from '@/auth/auth.module';
import { DbModule } from '@/db/db.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import UserRepository from './user.repository';
import { UserService } from './user.service';

describe('UsersController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
      imports: [DbModule, AuthModule]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
