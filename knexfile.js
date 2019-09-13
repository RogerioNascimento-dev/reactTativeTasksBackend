require('dotenv/config');

module.exports = {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE,
      user:     process.env.USER_DATABASE,
      password: process.env.PASSWORD_DATABASE,
    },
    searchPath: ['public'],
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
