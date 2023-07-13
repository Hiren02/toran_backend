import { Sequelize } from 'sequelize';
import Users from './users.js';
import {
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLIENT,
  DB_NAME,
  DB_PORT,
} from '../services/config.js';

const buildSequelizeOptions = () => {
  const data = {
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 60000,
      evict: 15000,
    },
    dialect: DB_CLIENT,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  };

  return data;
};

const sequelize = new Sequelize(buildSequelizeOptions());
Users(sequelize, Sequelize);

export { sequelize };
