'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments()
      table.string('nombre',80)
      table.string('ruta_imagen', 200)
      table.string('descripcion', 500)
      table.integer('cantidad')
      table.integer('prioridad')
      table.decimal('precio', 8, 2)
      table.integer('descuento').defaultTo(0)
      table.decimal('precio_total', 8, 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductoSchema
