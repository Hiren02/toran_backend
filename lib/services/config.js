import process from 'process';
import dotenv from 'dotenv';
dotenv.config();

export const APP_ENV = process.env?.APP_ENV ?? 'dev';
export const SERVER_PORT = Number(process.env.APP_PORT ?? 8080);
export const SECRET_KEY = process.env.SECRET_KEY ?? 'toranClub';

// Database
export const DB_HOST = process.env.DATABASE_HOST;
export const DB_CLIENT = process.env.DATABASE_CLIENT;
export const DB_PORT = process.env.DATABASE_PORT;

export const DB_NAME = process.env.DATABASE_NAME;
export const DB_USERNAME = process.env.DATABASE_USERNAME;
export const DB_PASSWORD = process.env.DATABASE_PASSWORD;

// BaseUrl for route
export const loginBaseURL = process.env.productBaseURL ?? '/api/login';
