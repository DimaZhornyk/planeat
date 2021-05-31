const fs = require('fs')
export enum AuthProvider {
  GOOGLE = 'google'
}
export const PRIVATE_RSA = fs.readFileSync('keys/private.pem');
export const PUBLIC_RSA = fs.readFileSync('keys/public.pem')
