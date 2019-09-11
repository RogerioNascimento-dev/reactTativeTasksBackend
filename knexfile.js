const {configDatabase} = require('./.env');

module.exports = {
    client: 'postgresql',
    connection: {
      database: configDatabase.database,
      user:     configDatabase.user,
      password: configDatabase.password,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
