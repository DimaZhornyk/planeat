import { Pool, PoolClient } from 'pg';
export function transactionOf<R>(pool: Pool) {
  return async (f: (c: PoolClient) => Promise<R>): Promise<[Error, R]> => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const res = await f(client);
      await client.query('COMMIT');
      return [null, res];
    } catch (e) {
      await client.query('ROLLBACK');
      return [e, null];
    } finally {
      client.release();
    }
  };
}
