require('dotenv').config();
import isProduction from './isProduction';

export const SERVER_PORT = process.env.SERVER_PORT;
export const STATIC_PATH = process.env.STATIC_PATH;
export const WDS_PORT = process.env.WDS_PORT;

export const client = {
  NAME: process.env.NAME,
  BACKUP_PROVIDER: process.env.BACKUP_PROVIDER,
  APP_ID: process.env.APP_ID,
  APP_KEY: process.env.APP_KEY,
  GALLERY_NAME: process.env.GALLERY_NAME,
  ROOT_URL: process.env.ROOT_URL,
  ENROLL_ROUTE: process.env.ENROLL_ROUTE,
  VERIFY_ROUTE: process.env.VERIFY_ROUTE,
  TOKEN_NAME: process.env.TOKEN_NAME,
  TOKEN_SYMBOL: process.env.TOKEN_SYMBOL,
  WALLET_NAME: process.env.WALLET_NAME,
  IS_PRODUCTION: isProduction
};
