const config = require('../knexfile.js');
const knex = require('knex')(config);

// - Ao ler o arquivo executa a migrate mais recente 
// - Desabilitando para rodar o comando de forma 

//knex.migrate.latest([config]); 

module.exports = knex;
