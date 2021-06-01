import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { ProviderId } from '@/providerIds';
import FileController from './file/file.controller';
import Creds from './db.creds';
import DumpService from './file/dump.service';
import { AuthModule } from '@/auth/auth.module';

const dbProvider = {
  provide: ProviderId.PG_POOL,
  useValue: new Pool(Creds)
};


@Module({
  controllers: [FileController],
  imports: [AuthModule],
  providers: [dbProvider, DumpService],
  exports: [dbProvider]
})
export class DbModule {}
