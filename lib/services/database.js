import process from 'process';
import pg from 'pg';
const { Pool } = pg;

const config = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export const pool = new Pool(config);

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
