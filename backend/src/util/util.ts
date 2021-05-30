import { Logger } from '@nestjs/common';

export function mapLog<T>(obj: T, logger: Logger): T {
  logger.debug(JSON.stringify(obj));
  return obj;
}
