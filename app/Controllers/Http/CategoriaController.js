'use strict'

const Categoria = use('App/Models/Categoria')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categorias
 */
class CategoriaController {
  /**
   * Show a list of all categorias.
   * GET categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const categorias = await Categoria.all()

     response.header('Access-Control-Allow-Origin', '*').status(200).json({
      message: 'Lista de todas las categorias.',
      datos: categorias,
       status: true
    })

  }

  /**
   * Show a list of all categorias con sus productos principales.
   * GET categorias-principal/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async principal ({ response, params:{id} }) {

    const categoria = await Categoria.find(id)

    await categoria.loadMany({
      productos: (builder) => builder.where('principal_categoria',true)
    })

    const productos_principales = categoria.getRelated('productos')

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: `Lista de todos los productos principales por la categoria ${id}, hay ${productos_principales.toJSON().length} ${productos_principales.toJSON().length === 1 ? 'producto principal por categoria' : 'productos principales por categoria' }`,
      datos: productos_principales,
      status: true
    })
  }


  /**
   * Create/save a new categoria.
   * POST categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let inforamcionCategoria = request.only(['nombre'])

    inforamcionCategoria.nombre = inforamcionCategoria.nombre.toLowerCase()

    const categoria = await Categoria.create(inforamcionCategoria)

    response.header('Access-Control-Allow-Origin', '*').status(201).json({
      mensaje: 'Nueva categoria creada correctamente.',
      datos: categoria,
      status: true
    })

  }

  /**
   * Display a single categoria.
   * GET categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({  request, response }) {

    const { categoria } = request

    categoria.productos = await categoria.productos().fetch()


    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Categoria encontrada correctamente.',
      datos: categoria,
      status: true
    })

  }

  async update ({ request, response }) {

    const { categoria } = request

    const informacionActualizadaCategoria = request.only(['nombre'])

    categoria.merge(informacionActualizadaCategoria)

    await categoria.save()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Categoria actualizada correctamente.',
      datos: categoria,
      status: true
    })


  }

  /**
   * Delete a categoria with id.
   * DELETE categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const { categoria } = request

    categoria.delete()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      message: 'Borrado con exito.',
      eliminado: true
    })

  }
}

module.exports = CategoriaController
