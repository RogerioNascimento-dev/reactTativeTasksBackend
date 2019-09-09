
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table =>{
      table.increments('id').primary();
      table.string('mome').notNull();
      table.string('email').notNull();
      table.string('password').notNull();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
