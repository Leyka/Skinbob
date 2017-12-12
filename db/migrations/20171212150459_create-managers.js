exports.up = function (knex, Promise) {
  return knex.schema.createTable('managers', (t) => {
    t.increments()
    t.string('email').notNullable().unique()
    t.string('password').notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {

}