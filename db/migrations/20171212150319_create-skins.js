exports.up = function (knex, Promise) {
  return knex.schema.createTable('skins', (t) => {
    t.increments()
    t.integer('public_id').notNullable().unique()
    t.integer('number').notNullable()
    t.string('name').notNullable()
    t.integer('price_on_sale')
    t.integer('champion_id').references('id').inTable('champions')
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {

}