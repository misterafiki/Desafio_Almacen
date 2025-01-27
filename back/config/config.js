import dotenv from 'dotenv';

dotenv.config();

export default {
  users: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USERS,
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PROD,
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
  },
};
