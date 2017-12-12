const knex = require('./knex')
const _ = require('lodash')

module.exports = {
  /**
   * Return all rows of a table. Can be sorted by column and direction
   * @param {string} tableName
   * @param {string} columnOrder Optional: Columne name to apply sort
   * @param {string} direction Optional: direction 'asc' or 'desc'
   */
  all: async function (tableName, columnOrder, direction) {
    if (typeof columnOrder === 'undefined' && typeof direction === 'undefined') {
      columnOrder = 'id'
      direction = 'asc'
    }
    return knex(tableName).orderBy(columnOrder, direction)
  },
  /**
   * Check if objects exists in database and return it
   * @param {string} tableName
   * @param {string} columnName
   * @param {*} valueToCompare
   */
  findBy: async function (tableName, columnName, valueToCompare) {
    const obj = await knex(tableName).whereExists(knex.select(columnName).where(columnName, valueToCompare))
    return obj[0]
  },
  /**
   * Insert object in database and return its id
   * @param {string} tableName
   * @param {object} object
   */
  insert: async function (tableName, object) {
    const id = await knex(tableName).insert(object).returning('id').into(tableName)
    return id[0]
  },
  /**
   * Insert object in database if it dosen't exist yet
   * @param {string} tableName
   * @param {string} columnName
   * @param {*} valueToCompare
   * @param {object} object
   */
  findOrCreate: async function (tableName, columnName, valueToCompare, object) {
    const obj = await this.findBy(tableName, columnName, valueToCompare)
    let id = null
    if (_.isEmpty(obj)) {
      // New, insert in db
      id = await this.insert(tableName, object)
    } else {
      id = await obj.id
    }
    return id
  },
  find: async function (tableName, fields) {
    const obj = await knex(tableName).where(fields)
    return obj[0]
  },
  /**
   * Count distinct rows from a table
   * @param {string} tableName
   */
  count: async function (tableName) {
    const count = await knex(tableName).countDistinct('id as sum')
    return count[0]['sum']
  },
  /**
   * Update specific fields and returns true if updated
   * @param {string} tableName
   * @param {integer} id
   * @param {object} fields
   */
  update: async function (tableName, id, fields) {
    const updated = await knex(tableName).where('id', id).update(fields)
    return updated === 1
  }
}