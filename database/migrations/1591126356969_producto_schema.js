'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.table('productos', (table) => {
      table.boolean('promo_gratis').defaultTo(false)
    })
  }

  down () {
    this.table('productos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProductoSchema
