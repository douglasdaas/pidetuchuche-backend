'use strict'

const Producto = use('App/Models/Producto')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Cloudinary = use('App/Services/Cloudinary')

/**
 * Resourceful controller for interacting with productos
 */
class ProductoController {
  /**
   * Show a list of all productos.
   * GET productos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {

    const productos = await Producto
      .query()
      .with('categorias')
      .orderBy('prioridad', 'asc')
      .fetch()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Lista de todos los productos',
      datos: productos,
      status: true
    })
  }

  /**
   * Show a list of all productos principales.
   * GET productos/principal
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async principal ({ response }) {


    const productos = await Producto
      .query()
      .where('principal', true)
      .with('categorias')
      .orderBy('prioridad', 'asc')
      .fetch()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: `Lista de todos los productos Principales, hay ${productos.toJSON().length} ${productos.toJSON().length === 1 ? 'producto principal' : 'productos principales' }`,
      datos: productos,
      status: true

    })
  }


  /**
   * Create/save a new producto.
   * POST productos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    console.log("Request.body::",request.body)

    const informacionProducto = request.only(['imagen','nombre','descripcion','cantidad','prioridad','precio','descuento','principal','promo_gratis'])

    let { categorias, principal_categoria } =  request.post()
    if (categorias !== undefined ){
      categorias = JSON.parse(categorias)
    }

    try{

      if(request.file('imagen') && request.file('imagen') !== undefined ){

        const imagenProducto = request.file('imagen', {
          types: ['image']
        })


        var cloudinary_response = await Cloudinary.upload(imagenProducto)


       informacionProducto.ruta_imagen = cloudinary_response.url
      } else {
        informacionProducto.ruta_imagen = "https://res.cloudinary.com/dd5fhsqn0/image/upload/v1586208431/Pide%20tu%20Chuche/paerwru0hmtq5qhi44h5.png"
      }


    }catch(error){


      return response.status(500).json({status: false, error: error })
    }

    const producto = await Producto.create(informacionProducto)

    if (categorias && categorias.length > 0){
      await producto.categorias().attach(categorias, (row) =>{
        if (principal_categoria){
          console.log(`principal_categoria:: ${principal_categoria}`)
          row.principal_categoria = principal_categoria
        }
      })
      producto.categorias = await producto.categorias().fetch()
    }

    response.header('Access-Control-Allow-Origin', '*').status(201).json({
      mensaje: 'Nuevo producto creado correctamente.',
      datos: producto,
      status: true

    })
  }

  /**
   * Display a single producto.
   * GET productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ request, response }) {

    const { producto } = request

    producto.categorias = await producto.categorias().fetch()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Producto encontrado correctamente.',
      datos: producto,
      status: true
    })

  }

  /**
   * Update producto details.
   * PUT or PATCH productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: {id}, request, response }) {

    let { categorias } =  request.post()
    if (categorias !== undefined ){
      categorias = JSON.parse(categorias)
    }
    const  producto  = await Producto.find(id)

    const informacionActualizadaProducto = request.only(['imagen','nombre','descripcion','cantidad','prioridad','precio','descuento','principal','promo_gratis'])


    console.log(informacionActualizadaProducto)
    try{

      if(request.file('imagen') && request.file('imagen') !== undefined){

        const imagenProducto = request.file('imagen', {
          types: ['image']
        })


        var cloudinary_response = await Cloudinary.upload(imagenProducto)


        informacionActualizadaProducto.ruta_imagen = cloudinary_response.url
      }


    }catch(error){

      return response.status(500).json({status: false, error: error })
    }

    producto.merge(informacionActualizadaProducto)

    await producto.save()

    console.log(categorias)

    await producto.categorias().detach()
    if (categorias && categorias.length > 0){
      await producto.categorias().detach()
      await producto.categorias().attach(categorias, (row) =>{
        if (principal_categoria){
          console.log(`principal_categoria:: ${principal_categoria}`)
          row.principal_categoria = principal_categoria
        }
      })
    }
    producto.categorias = await producto.categorias().fetch()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Producto actualizado correctamente.',
      datos: producto,
      status: true
    })

  }

  /**
   * Update producto details.
   * PUT or PATCH productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async venta ({ params: {id} ,request, response }) {

    let producto = await Producto.find(id)

    const {cantidad} = request.only(['cantidad'])
    console.log('producto.cantidad ',producto.cantidad)
    console.log('cv:: ',cantidad)

    if (producto.cantidad-cantidad < 0){
      return response.status(400).json({
        mensaje: 'No se puede vender más de lo que hay en existencia.',
        existencia: producto.cantidad,
        ventaIntentada: cantidad,
        datos: producto
      })
    }

    producto.merge({cantidad: producto.cantidad - cantidad})


    await producto.save()


    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Venta Realizada correctamente.',
      existencia: producto.cantidad,
      ventaRealizada: cantidad,
      datos: producto,
      status: true
    })

  }

  /**
   * Delete a producto with id.
   * DELETE productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ request, response }) {

    const { producto } = request

    producto.delete()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      message: 'Borrado con exito.',
      eliminado: true
    })
  }
}

module.exports = ProductoController
