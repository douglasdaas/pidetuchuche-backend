'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {

  static boot () {
    super.boot()
    this.addHook('beforeSave', 'ProductoHook.calcularPrecioFinal')
    this.addHook('beforeSave','ProductoHook.validarProductoPrincipal')
  }


  categorias () {
    return this.belongsToMany('App/Models/Categoria')
  }

}

module.exports = Producto
