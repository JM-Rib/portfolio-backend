path = require('path');
// const process.env = require('process.env').config({ path: path.resolve("routes", '../.env') }).parsed;
require('dotenv').config();

const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
//      timezone: '+02:00' //<-- here
    },
    listPerPage: 10,
};
module.exports = config;
