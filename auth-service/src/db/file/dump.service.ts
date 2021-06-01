import { Injectable, Logger } from '@nestjs/common';
import { execute } from '@getvim/execute';
import Creds from '@/db/db.creds';
import { readFileAsync } from '@/lib/file/utils';
import { Maybe } from '@/lib/fp/Maybe';
async function dumpAll(
  userName: string,
  password: string,
  host: string,
  port: string,
  fileName: string
) {
  try {
    await execute(
      `pg_dumpall -h ${host} -p ${port} -U ${userName} > ${fileName}`,
      {
        env: { PGPASSWORD: password }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

async function dumpOne(
  dbName: string,
  userName: string,
  password: string,
  host: string,
  port: string,
  fileName: string
) {
  try {
    await execute(
      `pg_dump -h ${host} -p ${port} -U ${userName} -d ${dbName} > ${fileName}`,
      {
        env: { PGPASSWORD: password }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

@Injectable()
export default class DumpService {
  private readonly logger = new Logger(DumpService.name);
  private readonly DUMP_FILE_NAME = 'resources/dump.out';
  public async dumpAll(): Promise<Buffer> {
    await dumpAll(
      Creds.user,
      Creds.password,
      Creds.host,
      Creds.port + '',
      this.DUMP_FILE_NAME
    );
    const buff = await readFileAsync(this.DUMP_FILE_NAME);
    return buff;
  }

  public async dumpOne(dbName: string): Promise<Buffer> {
    await dumpOne(
      dbName,
      Creds.user,
      Creds.password,
      Creds.host,
      Creds.port + '',
      this.DUMP_FILE_NAME
    );
    const buff = await readFileAsync(this.DUMP_FILE_NAME);
    return buff;
  }
}
