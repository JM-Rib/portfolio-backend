path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve("routes", '../.env') }).parsed;
const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: dotenv.DB_HOST,
      user: dotenv.DB_USERNAME,
      password: dotenv.DB_PASSWORD,
      database: dotenv.DB_DATABASE,
      port: dotenv.DB_PORT,
      ssl: true
//      timezone: '+02:00' //<-- here
    },
    listPerPage: 10,
};
module.exports = config;
