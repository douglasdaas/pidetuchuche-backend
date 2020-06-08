'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaProductoSchema extends Schema {
  up () {
    this.table('categoria_producto', (table) => {
      table.boolean('principal_categoria').defaultTo(false)
    })
  }

  down () {
    this.table('categoria_productos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CategoriaProductoSchema
