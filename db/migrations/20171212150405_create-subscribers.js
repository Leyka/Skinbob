const uuid5 = require('uuid/v5')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('subscribers', (t) => {
    t.increments()
    t.string('email').notNullable().unique()
    t.string('token').defaultTo(uuid5(Date.now().toString(), uuid5.DNS))
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {

}