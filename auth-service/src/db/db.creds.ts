class DbCreds {
  public readonly user = process.env.DB_USER ?? 'admin';
  public readonly host = process.env.DB_HOST ?? 'localhost';
  public readonly database = process.env.DB_DATABASE ?? 'stalevary';
  public readonly password = process.env.DB_PASSWORD ?? 'secret';
  public readonly port = Number.parseInt(process.env.DB_PORT ?? '5432');
}

export default new DbCreds();
