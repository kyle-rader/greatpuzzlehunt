require('babel-register');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'gph-dev'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './prod-db.sqlite3'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },


};
