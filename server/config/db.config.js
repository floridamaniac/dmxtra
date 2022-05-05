const options = { capSQL: true };

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'walter',
  database: process.env.DB_NAME || 'dmxtra',
  port: process.env.DB_PORT || '5432',
};

module.exports = require('pg-promise')(options)(dbConfig);
