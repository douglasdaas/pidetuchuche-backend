'use strict'

const Categoria = use('App/Models/Categoria')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindCategoria {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    id = id.toLowerCase()
    const categoria =  await  Categoria.find(id)

    if (!categoria) {
      return response.status(404).json({
        mensaje: 'Categoria no encontrada.',
        id
      })
    }

    request.categoria = categoria
    await next()
  }
}

module.exports = FindCategoria
