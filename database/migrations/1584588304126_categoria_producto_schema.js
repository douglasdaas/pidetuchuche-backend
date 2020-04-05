'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaProductoSchema extends Schema {
  up () {
    this.create('categoria_producto', (table) => {
      table.increments()
      table
        .string('categoria_id')
        .index('categoria_id')
      table
        .integer('producto_id')
        .unsigned()
        .index('producto_id')
      table
        .foreign('categoria_id')
        .references('categorias.nombre')
        .onDelete('cascade')
      table
        .foreign('producto_id')
        .references('productos.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('categoria_producto')
  }
}

module.exports = CategoriaProductoSchema
