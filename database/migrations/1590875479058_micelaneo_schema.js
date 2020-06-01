'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MicelaneoSchema extends Schema {
  up () {
    this.create('micelaneos', (table) => {
      table.increments()
      table.string('nombre',80)
      table.string('ruta', 200)
      table.timestamps()
    })
  }

  down () {
    this.drop('micelaneos')
  }
}

module.exports = MicelaneoSchema
