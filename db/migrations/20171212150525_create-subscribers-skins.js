exports.up = function (knex, Promise) {
  return knex.schema.createTable('subscribers_skins', (t) => {
    t.increments()
    t.integer('subscriber_id').references('id').inTable('subscribers')
    t.integer('skin_id').references('id').inTable('skins')
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {

}