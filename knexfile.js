const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://skinbob:qwerty@localhost:5432/skinbob_dev',
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    }
  }
}