CREATE DOMAIN email AS varchar(255) CHECK(
  value ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
);
CREATE TYPE auth_provider as ENUM ('google');
CREATE TABLE IF NOT EXISTS account (
  id SERIAL PRIMARY KEY,
  login VARCHAR(255) NOT NULL,
  email email NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS auth (
  id SERIAL PRIMARY KEY,
  password_hash VARCHAR(255),
  auth_provider auth_provider,
  account_id INT UNIQUE REFERENCES account(id),
  CONSTRAINT chk_null check (
    password_hash is not null
    or auth_provider is not null
  ),
  role VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255),
  account_id INT REFERENCES account(id)
);