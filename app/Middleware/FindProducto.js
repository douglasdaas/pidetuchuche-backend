'use strict'
const Producto = use('App/Models/Producto')

class FindProducto {
  async handle({ request, response, params: { id } }, next) {
    // call next to advance the request
    const producto = await Producto.find(id)

    if (!producto) {
      return response.status(404).json({
        message: 'Producto no encontrado.',
        id
      })
    }

    request.producto = producto

    await next()
  }
}

module.exports = FindProducto
