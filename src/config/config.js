require('dotenv').config();
module.exports = {
  development: {
    username: "postgres",
    password: "1978",
    database: "chat_db",
    port: 5432,
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {required: true, rejectUnauthorized: false}},
  },
};
