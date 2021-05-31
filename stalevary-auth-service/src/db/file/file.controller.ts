import { AuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/auth/authRole.decorator';
import { AuthRole } from '@/auth/authRole.entity';
import { ProviderId } from '@/providerIds';
import {
  Controller,
  Patch,
  Get,
  Res,
  Query,
  Logger,
  Post,
  UseInterceptors,
  UploadedFile,
  Inject,
  UseGuards,
  Param
} from '@nestjs/common';
import { Response } from 'express';
import DumpService from './dump.service';
@Controller('file')
export default class FileController {
  private readonly logger = new Logger(FileController.name);
  constructor(
    private readonly dumpService: DumpService
  ) {}
  
  @Roles(AuthRole.ADMIN)
  @UseGuards(AuthGuard)
  @Get('/dump')
  public async dumpDb(
    @Res({ passthrough: true }) response: Response,
    @Query() q: { dbName: string }
  ) {
    response.setHeader('content-type', 'application/octet-stream');
    const dump = await (q.dbName
      ? this.dumpService.dumpOne(q.dbName)
      : this.dumpService.dumpAll());
    response.end(dump, 'binary');
  }
}
