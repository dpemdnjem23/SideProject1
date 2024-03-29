require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // port:process.env.DATABASE_PORT,
    host: "127.0.0.1",
    // host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // port: process.env.DATABASE_PORT,

    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // port: process.env.DATABASE_PORT,

    host: "127.0.0.1",
    dialect: "mysql",
  },
};
