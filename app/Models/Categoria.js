'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {

  static get primaryKey () {
    return 'nombre'
  }

  productos() {
    return this
      .belongsToMany('App/Models/Producto')
      .withPivot(['principal_categoria'])
  }

}

module.exports = Categoria
