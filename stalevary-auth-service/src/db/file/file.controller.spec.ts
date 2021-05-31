import { ProviderId } from '@/providerIds';
import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import FileController from './file.controller';
import FileRepository from './file.repository';
import FileService from './file.service';
const dbProvider = {
  provide: ProviderId.PG_POOL,
  useValue: new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'vitrage',
    password: 'secret',
    port: 5432
  })
};

const fileRepoProvider = {
  provide: ProviderId.FILE_REPO,
  useClass: FileRepository
};
describe('FileController', () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [dbProvider, fileRepoProvider, FileService]
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
